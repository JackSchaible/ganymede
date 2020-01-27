using Ganymede.Api.Data.Initializers.Monsters.DandD.SRD.Parsers;
using Ganymede.Api.Data.Monsters;
using HtmlAgilityPack;

namespace Ganymede.Api.Data.Initializers.Monsters.DandD.SRD
{
    internal class SRDMonstersInitializer
    {
        private MarkdownParser _parser;

        public void Initialize(ApplicationDbContext ctx, MarkdownParser parser)
        {
            _parser = parser;

            var files = _parser.ListFiles("Monsters");

            foreach (var file in files)
            {
                var doc = _parser.ParseFile(file);
                var monster = CreateMonster(ctx, doc);
            }
        }

        private Monster CreateMonster(ApplicationDbContext ctx, HtmlDocument doc)
        {
            var monster = new Monster();

            var abilityParser = new AbilityScoresParser();
            var actionsParser = new ActionSetParser();
            var descriptorParser = new DescriptorParser();

            var text = doc.Text;
            monster.AbilityScores = abilityParser.Parse(text);
            // TODO: UNDO
            // monster.ActionSet = _actionsParser.Parse(doc, ctx);
            descriptorParser.Parse(text, monster);

            return monster;
        }
    }
}
