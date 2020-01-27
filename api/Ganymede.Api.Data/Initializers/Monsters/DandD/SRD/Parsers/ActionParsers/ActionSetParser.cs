using Ganymede.Api.Data.Initializers.Monsters.DandD.SRD.Parsers.ActionParsers;
using Ganymede.Api.Data.Monsters.Actions;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Action = Ganymede.Api.Data.Monsters.Actions.Action;

namespace Ganymede.Api.Data.Initializers.Monsters.DandD.SRD.Parsers
{
    internal class ActionSetParser
    {
        private readonly Regex MultiAttackRegex = new Regex("<strong>Multiattack\\.</strong> (.*)");
        private readonly Regex BasicActionRegex = new Regex("<strong>(.*)\\.</strong>(.*)");

        public ActionsSet Parse(HtmlDocument doc, ApplicationDbContext ctx)
        {
            var text = doc.Text;
            var actionsSet = new ActionsSet();

            var test = new Regex("Adult Red Dragon").Match(text);
            var actions = GetActions(text, actionsSet, ctx);

            return actionsSet;
        }

        private List<Action> GetActions(string doc, ActionsSet set, ApplicationDbContext ctx)
        {
            var actions = new List<Action>();

            string actionsH3 = "<h3>Actions</h3>";
            int indexOfActionsHeader = doc.IndexOf(actionsH3);
            if (indexOfActionsHeader >= 0)
            {
                var actionsString = doc[(indexOfActionsHeader + actionsH3.Length)..doc.IndexOf("</p>", doc.IndexOf(actionsH3))];
                var actionsList = actionsString.Split("<br />").ToList();

                if (actionsList.Count > 0)
                {
                    actionsList = ParseMultiattack(actionsList, set);

                    for (int i = 0; i < actionsList.Count; i++)
                    {
                        string action = actionsList[i];

                        if (!ParseAction(action, ctx))
                            if (i == 0)
                                throw new Exception($"Unable to determine action type of '{action}'");
                            else
                                actions[i - 1].Description += action;
                    }
                }
            }

            return actions;
        }

        private List<string> ParseMultiattack(List<string> actions, ActionsSet set)
        {
            var match = MultiAttackRegex.Match(actions[0]);
            if (match.Success)
                set.Multiattack = match.Groups[1].Value;
            actions.RemoveAt(0);

            return actions;
        }

        private bool ParseAction(string actionString, ApplicationDbContext ctx)
        {
            bool result = true;
            if (actionString.IndexOf("<em>Hit:</em>") >= 0)
                ctx.Attacks.Add(new AttackParser().Parse(actionString, ctx));
            else if (!new SubActionTypesParser().Parse(actionString, ctx))
            {
                // This **MUST** come last
                var basicMatch = BasicActionRegex.Match(actionString);
                if (basicMatch.Success)
                    ctx.Actions.Add(new Action
                    {
                        Name = basicMatch.Groups[1].Value,
                        Description = basicMatch.Groups[1].Value
                    });
            }
            else
                result = false;

            return result;
        }
    }
}
