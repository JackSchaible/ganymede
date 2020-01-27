﻿using Ganymede.Api.Data.Initializers.InitializerData;
﻿using Ganymede.Api.Data.Initializers.Monsters.DandD.SRD.Parsers;
using Ganymede.Api.Data.Monsters;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace Ganymede.Api.Data.Initializers.Monsters.DandD.SRD
{
    internal class SRDMonstersInitializer
    {
        private MarkdownParser _parser;

        public List<Monster> Initialize(ApplicationDbContext ctx, MarkdownParser parser, DiceRollData diceRolls)
        {
            _parser = parser;

            var files = _parser.ListFiles("Monsters");

            List<Monster> monsters = new List<Monster>();
            foreach (var file in files)
            {
                var doc = _parser.ParseFile(file);
                monsters.Add(CreateMonster(ctx, doc, regexs, diceRolls));
            }

            return monsters;
        }

        private Monster CreateMonster(ApplicationDbContext ctx, HtmlDocument doc, Regexs regexs, DiceRollData diceRolls)
        {
            var monster = new Monster();

            var abilityParser = new AbilityScoresParser();
            var actionsParser = new ActionSetParser();
            var descriptorParser = new DescriptorParser();

            var text = doc.Text;
            monster.AbilityScores = abilityParser.Parse(text);
            monster.ActionSet = ActionSetParser.Parse(doc, ctx, diceRolls);
            descriptorParser.Parse(text, monster);

            return monster;
        }
    }
}
