using Ganymede.Api.Data.Monsters.Actions;
using HtmlAgilityPack;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace Ganymede.Api.Data.Initializers.Monsters.DandD.SRD.Parsing
{
    internal class ActionSetParser
    {
        public ActionsSet Parse(HtmlDocument doc)
        {
            var text = doc.Text;
            var actionsSet = new ActionsSet();

            var test = new Regex("Adult Red Dragon").Match(text);
            var actions = GetActions(text);

            return actionsSet;
        }

        public List<Action> GetActions(string doc)
        {
            var actions = new List<Action>();

            string actionsH3 = "<h3>Actions</h3>";
            var actionsString = doc[(doc.IndexOf(actionsH3) + actionsH3.Length)..doc.IndexOf("</p>", doc.IndexOf(actionsH3))];
            var actionsList = actionsString.Split("<br />");


            return actions;
        }
    }
}
