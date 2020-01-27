using Ganymede.Api.Data.Characters;
using Ganymede.Api.Data.Initializers.InitializerData;
using Ganymede.Api.Data.Spells;
using Ganymede.Api.Extensions;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using static Ganymede.Api.Data.Initializers.Spells.SpellConfigurationData;

namespace Ganymede.Api.Data.Initializers.Spells
{
    internal class SRDSpellsImporter
    {
        private readonly Regex
            NumberAndUnitRegex = new Regex("([0-9]+) (\\w+)$"),
            RangeShapeRegex = new Regex("\\(([0-9]+)-(\\w+)(?:-\\w+)?( \\w+)?\\)"),
            LevelRegex = new Regex("<p><em>(.+)</em></p>"),
            NumberRegex = new Regex("([0-9])"),
            RitualRegex = new Regex("\\(ritual\\)"),
            AtHigherLevelsRegex = new Regex("<p><strong>At Higher Levels\\.</strong> (.+)</p>"),
            ParagraphRegex = new Regex("Duration:</strong>.+(?<text><p>.+</p>)", RegexOptions.Singleline),
            VerbalRegex = new Regex("( V,)|( V<br />)"),
            SomaticRegex = new Regex("( S,)|( S<br />)"),
            MaterialRegex = new Regex("( M,)|( M<br />)"),
            ConcentrationDurationRegex = new Regex("([0-9]+) (\\w+)");

        private readonly string StrongTagRegexPattern = "<strong>{0}:</strong> (.+)(?:<br />|</p>)";
        private SpellConfigurationData _data;
        private MarkdownParser _parser;

        public SpellData Initialize(MarkdownParser parser, SpellData spellData, SpellConfigurationData data)
        {
            _data = data;
            _parser = parser;

            List<Spell> spells = new List<Spell>();
            foreach (var spellFileName in parser.ListFiles("Spells"))
                spells.Add(CreateSpell(spellFileName));

            spellData.ChainLightning = spells.Find(s => s.Name == "Chain Lightning");
            spellData.Cloudkill = spells.Find(s => s.Name == "Cloudkill");
            spellData.Seeming = spells.Find(s => s.Name == "Seeming");
            spellData.IceStorm = spells.Find(s => s.Name == "Ice Storm");
            spellData.Fly = spells.Find(s => s.Name == "Fly");
            spellData.GaseousForm = spells.Find(s => s.Name == "Gaseous Form");
            spellData.Haste = spells.Find(s => s.Name == "Haste");
            spellData.LightningBolt = spells.Find(s => s.Name == "Lightning Bolt");
            spellData.GustOfWind = spells.Find(s => s.Name == "Gust of Wind");
            spellData.Invisibility = spells.Find(s => s.Name == "Invisibility");
            spellData.Levitate = spells.Find(s => s.Name == "Levitate");
            spellData.MistyStep = spells.Find(s => s.Name == "Misty Step");
            spellData.CharmPerson = spells.Find(s => s.Name == "Charm Person");
            spellData.ExpeditiousRetreat = spells.Find(s => s.Name == "Expeditious Retreat");
            spellData.FeatherFall = spells.Find(s => s.Name == "Feather Fall");
            spellData.Jump = spells.Find(s => s.Name == "Jump");
            spellData.MageArmor = spells.Find(s => s.Name == "Mage Armor");
            spellData.Thunderwave = spells.Find(s => s.Name == "Thunderwave");
            spellData.Light = spells.Find(s => s.Name == "Light");
            spellData.MageHand = spells.Find(s => s.Name == "Mage Hand");
            spellData.Message = spells.Find(s => s.Name == "Message");
            spellData.Prestidigitation = spells.Find(s => s.Name == "Prestidigitation");
            spellData.RayOfFrost = spells.Find(s => s.Name == "Ray of Frost");
            spellData.ShockingGrasp = spells.Find(s => s.Name == "Shocking Grasp");

            return spellData;
        }

        private Spell CreateSpell(string filename)
        {
            HtmlDocument htmlDoc = _parser.ParseFile(filename);

            var topSection = GetTopSection(htmlDoc);
            var spell = ConvertHtmlToSpell(htmlDoc.Text, topSection);

            _data.DatabaseContext.Spells.Add(spell);
            _data.DatabaseContext.ClassSpells.AddRange(GetClassSpells(topSection["classes"], spell));

            // TODO: Every spell is being created with a null entry in casting times?
            var castingTimes = GetCastingTimes(htmlDoc.Text);
            _data.DatabaseContext.SpellCastingTimes.AddRange(castingTimes.Select(ct => new SpellCastingTime
            {
                CastingTime = ct,
                Spell = spell
            }));

            return spell;
        }
        private Spell ConvertHtmlToSpell(string doc, Dictionary<string, string> topSection)
        {
            var levelAndSchool = LevelRegex.Match(doc).Groups[1].Value;

            // For conditional debugging, put inline when parsing is done
            var name = topSection["name"];
            return new Spell
            {
                AtHigherLevels = AtHigherLevelsRegex.Match(doc).Groups[1].Value,
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
        private List<ClassSpell> GetClassSpells(string classes, Spell spell)
        {
            string[] classList = classes.Split(',');
            List<ClassSpell> spells = new List<ClassSpell>();
            var classSpells = classList.Select(cl => new ClassSpell
            {
                Class = GetClassByName(cl),
                Spell = spell
            }).ToList();

            _data.DatabaseContext.ClassSpells.AddRange(classSpells);

            return spells;
        }

        private Match GetMatchByStrongText(string doc, string text) => new Regex(string.Format(StrongTagRegexPattern, text)).Match(doc);
        private PlayerClass GetClassByName(string name) => _data.PCData.GetType().GetProperty(name.Capitalize()).GetValue(_data.PCData, null) as PlayerClass;
        private SpellSchool GetSchool(Dictionary<string, string> topSection) => _data.Schools.First(s => s.Name.ToLowerInvariant() == topSection["school"]);
        private string GetDescription(string doc) => ParagraphRegex.Match(doc).Groups["text"].Value;

        private List<CastingTime> GetCastingTimes(string doc)
        {
            List<CastingTime> castingTimes = new List<CastingTime>();

            var match = GetMatchByStrongText(doc, "Casting Time");
            var text = match.Groups[1].Value;
            var indexOfReaction = text.IndexOf("reaction");

            CastingTime extractCastingTimes(string text)
            {
                CastingTime castingTime;
                if (indexOfReaction > -1)
                {
                    castingTime = new CastingTime
                    {
                        Type = SpellConstants.CastingTimeType.Reaction,
                        ReactionCondition = text.Substring(indexOfReaction + 10)
                    };
                }
                else if (text.IndexOf("bonus action") > -1)
                {
                    castingTime = new CastingTime
                    {
                        Type = SpellConstants.CastingTimeType.BonusAction,
                    };
                }
                else if (text.IndexOf("action") > -1)
                {
                    castingTime = new CastingTime
                    {
                        Type = SpellConstants.CastingTimeType.Action
                    };
                }
                else
                {
                    int time = int.Parse(Regex.Match(text, "^\\d*").Value);
                    string unit = Regex.Match(text, "\\w*$").Value;

                    castingTime = new CastingTime
                    {
                        Amount = time,
                        Type = SpellConstants.CastingTimeType.Time,
                        Unit = unit
                    };
                }

                CastingTime existing = _data.CastingTimes.SingleOrDefault(ct =>
                    ct.Amount == castingTime.Amount
                    && ct.ReactionCondition == castingTime.ReactionCondition
                    && ct.Type == castingTime.Type
                    && ct.Unit == castingTime.Unit);

                if (existing == null)
                {
                    _data.DatabaseContext.CastingTimes.Add(castingTime);
                    _data.CastingTimes.Add(castingTime);
                }
                else
                    castingTime = existing;

                return castingTime;
            }

            if (text.IndexOf(" or ") > -1 && indexOfReaction == -1)
            {
                string[] texts = text.Split(" or ");

                foreach (var t in texts)
                    castingTimes.Add(extractCastingTimes(t));
            }
            else
                castingTimes.Add(extractCastingTimes(text));

            return castingTimes;
        }
        private SpellComponents GetComponents(string doc)
        {
            SpellComponents components = new SpellComponents();

            var text = GetMatchByStrongText(doc, "Components").Groups[1].Value;

            components.Verbal = VerbalRegex.IsMatch(text);
            components.Somatic = SomaticRegex.IsMatch(text);
            components.Material = MaterialRegex.IsMatch(text)
                ? string.Join(SpellConstants.EncodedComma, text[text.IndexOf("(")..text.IndexOf(")")].Split(","))
                : null;

            SpellComponents existing = _data.Components.SingleOrDefault(sc => 
                sc.Verbal == components.Verbal
                && sc.Somatic == components.Somatic
                && sc.Material == components.Material);

            if (existing == null)
            {
                _data.DatabaseContext.SpellComponents.Add(components);
                _data.Components.Add(components);
            }
            else
                components = existing;

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

            SpellDuration existing = _data.Durations.SingleOrDefault(d =>
                d.Amount == duration.Amount
                && d.Concentration == duration.Concentration
                && d.Type == duration.Type
                && d.Unit == duration.Unit
                && d.UntilDispelled == duration.UntilDispelled
                && d.UntilTriggered == duration.UntilTriggered
                && d.UpTo == duration.UpTo);

            if (existing == null)
            {
                _data.DatabaseContext.SpellDurations.Add(duration);
                _data.Durations.Add(duration);
            }
            else
                duration = existing;

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

            SpellRange existing = _data.Ranges.SingleOrDefault(sr =>
                sr.Amount == range.Amount
                && sr.Shape == range.Shape
                && sr.Type == range.Type
                && sr.Unit == range.Unit);

            if (existing == null)
            {
                _data.DatabaseContext.SpellRanges.Add(range);
                _data.Ranges.Add(range);
            }
            else
                range = existing;

            return range;
        }
    }
}
