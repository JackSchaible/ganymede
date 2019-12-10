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
        public SpellData Initialize(ApplicationDbContext ctx, SpellData data, string rootPath)
        {
            List<Spell> spells = new List<Spell>();
            foreach (var spellFileName in Directory.EnumerateFiles(Path.Combine(rootPath, "Sources", "Spells")))
                spells.Add(AddSpell(ctx, spellFileName));

            // TODO: Add any required spells to the data

            return data;
        }

        private Spell AddSpell(ApplicationDbContext ctx, string filename)
        {
            string fileString;

            using (var fs = File.OpenRead(filename))
            using (var sr = new StreamReader(fs))
                fileString = sr.ReadToEnd();

            var htmlString = Markdown.ToHtml(fileString);
            var htmlDoc = new HtmlDocument();
            htmlDoc.LoadHtml(htmlString);

            var spell = ConvertHtmlToSpell(htmlDoc);
            var topSection = GetTopSection(htmlDoc);

            ctx.Spells.Add(spell);
            ctx.ClassSpells.AddRange(GetClassSpells(topSection["classes"], ctx, spell));

            return spell;
        }

        private Spell ConvertHtmlToSpell(HtmlDocument doc)
        {
            return new Spell
            {
                AtHigherLevels = GetAtHigherLevels(doc),
                CastingTime = GetCastingTime(doc),
            };
        }

        private string GetAtHigherLevels(HtmlDocument doc)
        {
            var atHigherLevelsNode = GetNodeByStrongText(doc, "At Higher Levels");
            if (atHigherLevelsNode == null) return null;

            var text = atHigherLevelsNode.InnerText;

            return text.Substring(18);
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
        private List<ClassSpell> GetClassSpells(string classes, ApplicationDbContext ctx, Spell spell)
        {
            string[] classList = classes.Split(',');
            List<ClassSpell> spells = new List<ClassSpell>();

            ctx.ClassSpells.AddRange(classList.Select(cl => new ClassSpell
            {
                Class = ctx.PlayerClasses.First(x => x.Name.ToLowerInvariant() == cl),
                Spell = spell
            }));

            return spells;
        }

        private HtmlNode GetNodeByStrongText(HtmlDocument doc, string text)
        {
            var descendantsWithStrongs = doc.DocumentNode.Descendants("p")
                .Where(d => d.Descendants("strong").Any());
            return
                descendantsWithStrongs
                    .FirstOrDefault(d => d.Descendants("strong")
                        .First().InnerText.IndexOf(text) > -1);
        }

        private Dictionary<string, string> GetTopSection(HtmlDocument doc)
        {
            string text = doc.DocumentNode.Descendants("p").First().InnerText;
            List<string> values = text.Split("\r\n").ToList();

            Dictionary<string, string> topValues = new Dictionary<string, string>();
            string lastKey = null;
            foreach(var value in values)
            {
                if (value.IndexOf(':') < 0)
                    topValues[lastKey] += $",{value}";
                else
                {
                    var kvp = value.Split(':');
                    topValues.Add(kvp[0], kvp[1]);
                    lastKey = kvp[0];
                }
            }

            return topValues;
        }
    }
}
