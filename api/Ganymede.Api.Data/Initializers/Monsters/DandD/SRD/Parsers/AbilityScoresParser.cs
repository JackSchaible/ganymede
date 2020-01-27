using Ganymede.Api.Data.Monsters;
using System;
using System.Text.RegularExpressions;

namespace Ganymede.Api.Data.Initializers.Monsters.DandD.SRD.Parsers
{
    internal class AbilityScoresParser
    {
        private readonly Regex Regex = new Regex("\\| ([0-9]+) ");
        private readonly int
            _str = 0,
            _dex = 1,
            _con = 2,
            _int = 3,
            _wis = 4,
            _cha = 5;

        public AbilityScores Parse(string text)
        {
            var scores = new AbilityScores();
            MatchCollection matches = Regex.Matches(text);

            if (matches.Count != 6)
                throw new Exception("Ability scores parse error: incorrect number of matches.");

            scores.Strength = int.Parse(matches[_str].Groups[1].Value);
            scores.Dexterity = int.Parse(matches[_dex].Groups[1].Value);
            scores.Constitution = int.Parse(matches[_con].Groups[1].Value);
            scores.Intelligence = int.Parse(matches[_int].Groups[1].Value);
            scores.Wisdom = int.Parse(matches[_wis].Groups[1].Value);
            scores.Charisma = int.Parse(matches[_cha].Groups[1].Value);

            return scores;
        }
    }
}
