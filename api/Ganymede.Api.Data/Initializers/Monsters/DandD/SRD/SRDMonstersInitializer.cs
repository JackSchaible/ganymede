using Ganymede.Api.Data.Initializers.Monsters.DandD.SRD.Parsing;
using Ganymede.Api.Data.Monsters;
using HtmlAgilityPack;
using System;
using System.Text.RegularExpressions;

namespace Ganymede.Api.Data.Initializers.Monsters.DandD.SRD
{
    internal class SRDMonstersInitializer
    {
        MarkdownParser _parser;

        public void Initialize(ApplicationDbContext ctx, MarkdownParser parser)
        {
            _parser = parser;

            var files = _parser.ListFiles("Monsters");
            var regexs = new Regexs();

            foreach (var file in files)
            {
                var doc = _parser.ParseFile(file);
                var monster = CreateMonster(ctx, doc, regexs);
            }
        }

        private Monster CreateMonster(ApplicationDbContext ctx, HtmlDocument doc, Regexs regexs)
        {
            var monster = new Monster();

            var text = doc.Text;
            monster.AbilityScores = GetAbilityScores(text, regexs.AbilityScores);
            monster.ActionSet = ActionSetParser.Parse(doc, ctx);

            return monster;
        }

        private AbilityScores GetAbilityScores(string file, Regex regex)
        {
            var scores = new AbilityScores();
            MatchCollection matches = regex.Matches(file);

            if (matches.Count != 6)
                throw new Exception("Ability scores parse error: incorrect number of matches.");

            scores.Strength = int.Parse(matches[0].Groups[1].Value);
            scores.Dexterity = int.Parse(matches[1].Groups[1].Value);
            scores.Constitution = int.Parse(matches[2].Groups[1].Value);
            scores.Intelligence = int.Parse(matches[3].Groups[1].Value);
            scores.Wisdom = int.Parse(matches[4].Groups[1].Value);
            scores.Charisma = int.Parse(matches[5].Groups[1].Value);

            return scores;
        }

        private class Regexs 
        {
            public Regex AbilityScores = new Regex("\\| ([0-9]+) ");
        }
    }
}
