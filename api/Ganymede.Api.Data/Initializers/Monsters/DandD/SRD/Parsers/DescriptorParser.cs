using Ganymede.Api.Data.Monsters;
using Ganymede.Api.Extensions;
using System;
using System.Text.RegularExpressions;

namespace Ganymede.Api.Data.Initializers.Monsters.DandD.SRD.Parsers
{
    public class DescriptorParser
    {
        private readonly Regex _descriptorTextRegex = new Regex(@"<p><em>(\w+) (\w+), (\w+) (\w+)</em></p>");
        private readonly int
            _size = 1,
            _type = 2,
            _ethics = 3,
            _morals = 4;

        public void Parse(string text, Monster monster)
        {
            var match = _descriptorTextRegex.Match(text);

            if (match.Success)
            {
                var size = match.Groups[_size].Value;
                monster.Size = int.Parse(typeof(MonsterConfigurationData).GetProperty($"S{size.Capitalize()}").GetValue(null).ToString());

                var type = match.Groups[_type].Value;
                monster.Size = int.Parse(typeof(MonsterConfigurationData).GetProperty($"MT{type.Capitalize()}").GetValue(null).ToString());

                // TODO: Alignment(s)
            }
            else
                throw new Exception("Descriptor Regex fails!");
        }
    }
}
