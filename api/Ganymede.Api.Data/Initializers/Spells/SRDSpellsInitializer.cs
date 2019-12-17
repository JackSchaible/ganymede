using Ganymede.Api.Data.Characters;
using Ganymede.Api.Data.Initializers.InitializerData;
using Ganymede.Api.Data.Spells;
using HtmlAgilityPack;
using Markdig;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using static Ganymede.Api.Data.Initializers.Spells.SpellsDnDInitializer;

namespace Ganymede.Api.Data.Initializers.Spells
{
    internal class SRDSpellsInitializer
    {
        private readonly Regex 
            NumberAndUnitRegex = new Regex("([0-9]+) (\\w+)$"),
            RangeShapeRegex = new Regex("\\(([0-9]+)-(\\w+)(?:-\\w+)?( \\w+)?\\)"),
            LevelRegex = new Regex("<p><em>(.+)</em></p>"),
            NumberRegex = new Regex("([0-9])"),
            RitualRegex = new Regex("\\(ritual\\)"),
            AtHigherLevelsRegex = new Regex("<p><strong>At Higher Levels\\.</strong> (.+)</p>"),
            ParagraphRegex = new Regex("<p>\\.+</p>"),
            VerbalRegex = new Regex("( V,)|( V<br />)"),
            SomaticRegex = new Regex("( S,)|( S<br />)"),
            MaterialRegex = new Regex("( M,)|( M<br />)"),
            ConcentrationDurationRegex = new Regex("([0-9]+) (\\w+)");

        private readonly string StrongTagRegexPattern = "<strong>{0}:</strong> (.+)(?:<br />|</p>)";
        private List<SpellSchool> _schools;

        public SpellData Initialize(ApplicationDbContext ctx, SpellData data, List<SpellSchool> schools, PlayerClassData pcData, string rootPath)
        {
            _schools = schools;

            List<Spell> spells = new List<Spell>();
            foreach (var spellFileName in Directory.EnumerateFiles(Path.Combine(rootPath, "Sources", "Spells")))
                spells.Add(AddSpell(ctx, pcData, spellFileName));

            // TODO: Add any required spells to the data

            return data;
        }

        private Spell AddSpell(ApplicationDbContext ctx, PlayerClassData data, string filename)
        {
            string fileString;

            using (var fs = File.OpenRead(filename))
            using (var sr = new StreamReader(fs))
                fileString = sr.ReadToEnd();

            var htmlString = Markdown.ToHtml(fileString);
            var htmlDoc = new HtmlDocument();
            htmlDoc.LoadHtml(htmlString);

            var topSection = GetTopSection(htmlDoc);
            var spell = ConvertHtmlToSpell(htmlDoc.Text, topSection);

            ctx.Spells.Add(spell);
            ctx.ClassSpells.AddRange(GetClassSpells(topSection["classes"], ctx, data, spell));

            return spell;
        }

        private Spell ConvertHtmlToSpell(string doc, Dictionary<string, string> topSection)
        {
            // For conditional debugging, put inline when parsing is done
            var name = topSection["name"];

            var levelAndSchool = LevelRegex.Match(doc).Groups[1].Value;

            return new Spell
            {
                AtHigherLevels = AtHigherLevelsRegex.Match(doc).Groups[1].Value,
                CastingTime = GetCastingTime(doc),
                Description = GetDescription(doc),
                Level = levelAndSchool.Contains("cantrip") ? 0 : int.Parse(NumberRegex.Match(levelAndSchool).Groups[1].Value),
                Name = name,
                Ritual = RitualRegex.IsMatch(levelAndSchool),
                SpellComponents = GetComponents(doc),
                SpellDuration = GetDuration(doc, name),
                SpellRange = GetRange(doc, name),
                SpellSchool = GetSchool(topSection)
            };
        }

        private Dictionary<string, string> GetTopSection(HtmlDocument doc)
        {
            string text = doc.DocumentNode.SelectSingleNode("/p").InnerText;
            List<string> values = text.Split("\n").ToList();

            Dictionary<string, string> topValues = new Dictionary<string, string>();
            string lastKey = null;
            foreach (var value in values)
            {
                if (value.IndexOf(':') < 0)
                    topValues[lastKey] += $",{value}";
                else
                {
                    var kvp = value.Split(':');
                    topValues.Add(kvp[0].Trim(), kvp[1].Trim());
                    lastKey = kvp[0];
                }
            }

            return topValues;
        }
        private CastingTime GetCastingTime(string doc)
        {
            CastingTime ct;
            var match = GetMatchByStrongText(doc, "Casting Time");
            var text = match.Groups[1].Value;

            var indexOfReaction = text.IndexOf("reaction");
            if (indexOfReaction > -1)
            {
                ct = new CastingTime
                {
                    Type = SpellConstants.CastingTimeType.Reaction,
                    ReactionCondition = text.Substring(indexOfReaction + 10)
                };
            }
            else if (text.IndexOf("bonus action") > -1)
            {
                ct = new CastingTime
                {
                    Type = SpellConstants.CastingTimeType.BonusAction,
                };
            }
            else if (text.IndexOf("action") > -1)
            {
                ct = new CastingTime
                {
                    Type = SpellConstants.CastingTimeType.Action
                };
            }
            else
            {
                int time = int.Parse(Regex.Match(text, "^\\d*").Value);
                string unit = Regex.Match(text, "\\w*$").Value;

                ct = new CastingTime
                {
                    Amount = time,
                    Type = SpellConstants.CastingTimeType.Time,
                    Unit = unit
                };
            }

            return ct;
        }
        private List<ClassSpell> GetClassSpells(string classes, ApplicationDbContext ctx, PlayerClassData data, Spell spell)
        {
            string[] classList = classes.Split(',');
            List<ClassSpell> spells = new List<ClassSpell>();
            var classSpells = classList.Select(cl => new ClassSpell
            {
                Class = GetClassByName(cl, data),
                Spell = spell
            }).ToList();

            ctx.ClassSpells.AddRange(classSpells);

            return spells;
        }

        private string GetDescription(string doc) 
        {
            var matches = ParagraphRegex.Matches(doc);

            string desc = null;

            foreach (Match match in matches)
            {
                var value = match.Value;
                if (!value.Contains("<em>") && !value.Contains("<strong>"))
                    desc = value;
            }

            return desc;
        }
        private Match GetMatchByStrongText(string doc, string text) => new Regex(string.Format(StrongTagRegexPattern, text)).Match(doc);
        private PlayerClass GetClassByName(string name, PlayerClassData data) => data.GetType().GetProperty(name.Capitalize()).GetValue(data, null) as PlayerClass;
        private SpellComponents GetComponents(string doc)
        {
            SpellComponents components = new SpellComponents();

            var text = GetMatchByStrongText(doc, "Components").Groups[1].Value;

            components.Verbal = VerbalRegex.IsMatch(text);
            components.Somatic = SomaticRegex.IsMatch(text);
            components.Material = MaterialRegex.IsMatch(text)
                ? string.Join(SpellConstants.EncodedComma, text[text.IndexOf("(")..text.IndexOf(")")].Split(","))
                : null;

            return components;
        }
        private SpellDuration GetDuration(string doc, string name)
        {
            SpellDuration duration = new SpellDuration();
            var text = GetMatchByStrongText(doc, "Duration").Groups[1].Value;

            var durationMatch = NumberAndUnitRegex.Match(text);
            if (durationMatch.Success)
            {
                duration.Type = SpellConstants.DurationType.Duration;
                duration.Amount = int.Parse(durationMatch.Groups[1].Value);
                duration.Unit = durationMatch.Groups[2].Value;
            }
            else if (text.Contains("concentration", StringComparison.OrdinalIgnoreCase))
            {
                duration.Concentration = true;
                duration.UpTo = text.Contains("up to", StringComparison.OrdinalIgnoreCase);

                var cDuration = ConcentrationDurationRegex.Match(text);
                duration.Amount = int.Parse(cDuration.Groups[1].Value);
                duration.Unit = cDuration.Groups[2].Value;
            }
            else if (text.Contains("Instantaneous", StringComparison.OrdinalIgnoreCase))
                duration.Type = SpellConstants.DurationType.Instantaneous;
            else if (text.Contains("Until", StringComparison.OrdinalIgnoreCase))
            {
                duration.Type = SpellConstants.DurationType.Until;
                duration.UntilDispelled = text.Contains("dispelled", StringComparison.OrdinalIgnoreCase);
                duration.UntilTriggered = text.Contains("triggered", StringComparison.OrdinalIgnoreCase);
            }
            else if (text.Contains("Special", StringComparison.OrdinalIgnoreCase))
                duration.Type = SpellConstants.DurationType.Special;
            else
                throw new Exception($"Unable to determine duration type for spell {name}");

            return duration;
        }
        private SpellRange GetRange(string doc, string name)
        {
            SpellRange range = new SpellRange();
            var matchText = GetMatchByStrongText(doc, "Range").Groups[1].Value;

            var rangeMatch = NumberAndUnitRegex.Match(matchText);
            if (matchText.Contains("Self", StringComparison.OrdinalIgnoreCase))
            {
                range.Type = SpellConstants.RangeType.Self;

                var rangeShapeMatch = RangeShapeRegex.Match(matchText);
                if (rangeShapeMatch.Success)
                {
                    range.Amount = int.Parse(rangeShapeMatch.Groups[1].Value);
                    range.Unit = rangeShapeMatch.Groups[2].Value;
                    range.Shape = rangeShapeMatch.Groups[3].Value;
                }
            }
            else if (matchText.Contains("Touch", StringComparison.OrdinalIgnoreCase))
                range.Type = SpellConstants.RangeType.Touch;
            else if (matchText.Contains("Sight", StringComparison.OrdinalIgnoreCase))
                range.Type = SpellConstants.RangeType.Sight;
            else if (rangeMatch.Success)
            {
                range.Amount = int.Parse(rangeMatch.Groups[1].Value);
                range.Unit = rangeMatch.Groups[2].Value;
            }
            else if (matchText.Contains("Special", StringComparison.OrdinalIgnoreCase))
                range.Type = SpellConstants.RangeType.Special;
            else if (matchText.Contains("Unlimited", StringComparison.OrdinalIgnoreCase))
                range.Type = SpellConstants.RangeType.Unlimited;
            else
                throw new Exception($"Cannot parse range type for spell {name}");

            return range;
        }
        private SpellSchool GetSchool(Dictionary<string, string> topSection) => _schools.First(s => s.Name.ToLowerInvariant() == topSection["school"]);
    }
}
