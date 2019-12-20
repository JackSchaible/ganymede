using Ganymede.Api.Data.Monsters.Actions;
using HtmlAgilityPack;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace Ganymede.Api.Data.Initializers.Monsters.DandD.SRD.Parsing
{
    internal class ActionSetParser
    {
        private Regex MultiAttackRegex = new Regex("\\*\\*Multiattack\\.\\*\\*\\ (.+)");

        public ActionsSet Parse(HtmlDocument doc)
        {
            var actionsSet = new ActionsSet();

            //var multi = MultiAttackRegex.Match(doc);
            //actionsSet.Multiattack = multi.Success ? multi.Value : null;

            return actionsSet;
        }

        public List<Action> GetActions(string doc)
        {
            var actions = new List<Action>();

            return actions;
        }
    }
}
