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
        private readonly Regex NumberAndUnitRegex = new Regex("([0-9]+) (\\w+)( \\w+)?$");

        public SpellData Initialize(ApplicationDbContext ctx, SpellData data, PlayerClassData pcData, string rootPath)
        {
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
            var spell = ConvertHtmlToSpell(htmlDoc, topSection);

            ctx.Spells.Add(spell);
            ctx.ClassSpells.AddRange(GetClassSpells(topSection["classes"], ctx, data, spell));

            return spell;
        }

        private Spell ConvertHtmlToSpell(HtmlDocument doc, Dictionary<string, string> topSection)
        {
            // For conditional debugging, put inline when parsing is done
            var name = topSection["name"];

            return new Spell
            {
                AtHigherLevels = GetAtHigherLevels(doc),
                CastingTime = GetCastingTime(doc),
                Description = GetDescription(doc),
                Level = GetLevel(topSection),
                Name = name,
                Ritual = GetRitual(doc),
                SpellComponents = GetComponents(doc),
                SpellDuration = GetDuration(doc, name),
                SpellRange = GetRange(doc, name)
            };
        }

        private string GetAtHigherLevels(HtmlDocument doc)
        {
            var atHigherLevelsNode = GetNodeByStrongText(doc, "At Higher Levels");
            if (atHigherLevelsNode == null) return null;

            var text = atHigherLevelsNode.InnerText;

            return text.Substring(18);
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
        private CastingTime GetCastingTime(HtmlDocument doc)
        {
            CastingTime ct;
            var castingTimeNode = GetNodeByStrongText(doc, "Casting Time");
            var text = castingTimeNode.InnerText.Substring(14);

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

        private string GetDescription(HtmlDocument doc) => $"<p>{string.Join("</p><p>", doc.DocumentNode.SelectNodes("/p[not(.//strong)]").Last().InnerText.Split("\n"))}</p>";
        private HtmlNode GetNodeByStrongText(HtmlDocument doc, string text) => doc.DocumentNode.SelectSingleNode($"/p[strong[contains(text(), \"{text}\")]]");
        private PlayerClass GetClassByName(string name, PlayerClassData data) => data.GetType().GetProperty(name.Capitalize()).GetValue(data, null) as PlayerClass;
        private int GetLevel(Dictionary<string, string> topSection) => int.Parse(topSection["level"]);
        private bool GetRitual(HtmlDocument doc) => doc.DocumentNode.SelectSingleNode("/p[em]").InnerText.Contains("(ritual");
        private SpellComponents GetComponents(HtmlDocument doc)
        {
            SpellComponents components = new SpellComponents();

            var text = GetNodeByStrongText(doc, "Components").InnerText;

            components.Verbal = new Regex("( V,)|( V<br />)").IsMatch(text);
            components.Somatic = new Regex("( S,)|( S<br />)").IsMatch(text);
            components.Material = new Regex("( M,)|( M<br />)").IsMatch(text)
                ? string.Join(SpellConstants.EncodedComma, text.Substring(text.IndexOf("("), text.IndexOf(")") - text.IndexOf("(")).Split(","))
                : null;

            return components;
        }
        private SpellDuration GetDuration(HtmlDocument doc, string name)
        {
            SpellDuration duration = new SpellDuration();
            var node = GetNodeByStrongText(doc, "Duration");
            var text = node.InnerText;

            var durationMatch = NumberAndUnitRegex.Match(text);
            if (durationMatch.Success)
            {
                duration.Type = SpellConstants.DurationType.Duration;
                duration.Amount = int.Parse(durationMatch.Groups[0].Value);
                duration.Unit = durationMatch.Groups[1].Value;

                if (text.Contains("concentration", StringComparison.OrdinalIgnoreCase))
                {
                    duration.Concentration = true;
                    duration.UpTo = text.Contains("up to", StringComparison.OrdinalIgnoreCase);
                }
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
        private SpellRange GetRange(HtmlDocument doc, string name)
        {
            SpellRange range = new SpellRange();
            var text = GetNodeByStrongText(doc, "Range").InnerText;

            var rangeMatch = NumberAndUnitRegex.Match(text);
            var extractAmountAndUnit = Func()
            {
                range.Amount = int.Parse(rangeMatch.Groups[0].Value);
                range.Unit = rangeMatch.Groups[1].Value;

                if (rangeMatch.Groups[2].Success)
                    range.Shape = rangeMatch.Groups[2].Value;
            };

            if (rangeMatch.Success)
            {
                
            }
            else if (text.Contains("self", StringComparison.OrdinalIgnoreCase))
            {
                range.Type = SpellConstants.RangeType.Self;

                int startOfSelfShape = 
                if (text.)
            }

            return range;
        }
    }
}
