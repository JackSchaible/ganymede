using Ganymede.Api.Data.Initializers.InitializerData;
using Ganymede.Api.Data.Initializers.Monsters.DandD.SRD.Parsing.ActionParsers;
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
        private static readonly Regex 
            MultiAttackRegex = new Regex(@"<strong>Multiattack\.</strong> (.*)"),
            BasicActionRegex = new Regex(@"<strong>(.*)\.</strong>(.*)");
        private static readonly int
            miMultiAttack = 1,
            miBasicName = 1,
            miBasicDesc = 2;

        public static ActionsSet Parse(HtmlDocument doc, ApplicationDbContext ctx, DiceRollData diceRolls)
        {
            var text = doc.Text;
            var actionsSet = new ActionsSet();

            //var test = new Regex("Adult Red Dragon").Match(text);
            var test = new Regex("Druid").Match(text);
            var actions = GetActions(text, actionsSet, ctx, diceRolls);

            return actionsSet;
        }

        private static List<Action> GetActions(string doc, ActionsSet set, ApplicationDbContext ctx, DiceRollData diceRolls)
        {
            var actions = new List<Action>();

            const string actionsH3 = "<h3>Actions</h3>";
            int indexOfActionsHeader = doc.IndexOf(actionsH3);
            if (indexOfActionsHeader >= 0)
            {
                var actionsString = doc[(indexOfActionsHeader + actionsH3.Length)..doc.IndexOf("</p>", doc.IndexOf(actionsH3))];
                var actionsList = actionsString.Split("<br />").ToList();

                if (actionsList.Count > 0)
                {
                    actionsList = ParseMultiattack(actionsList, set);

                    int lastIndexWithAction = 0;
                    for (int i = 0; i < actionsList.Count; i++)
                    {
                        string action = actionsList[i];

                        if (TryParseAction(action, ctx, diceRolls, out Action newAction))
                        {
                            lastIndexWithAction = i;
                            actions.Add(newAction);
                        }
                        else
                        {
                            if (i == 0)
                                throw new Exception($"Unable to determine action type of '{action}'");
                            else
                                actions[lastIndexWithAction].Description += action;
                        }
                    }
                }
            }

            return actions;
        }

        private List<string> ParseMultiattack(List<string> actions, ActionsSet set)
        {
            var match = MultiAttackRegex.Match(actions[0]);
            if (match.Success)
            {
                set.Multiattack = match.Groups[miMultiAttack].Value;
                actions.RemoveAt(0);
            }

            return actions;
        }

        private static bool TryParseAction(string actionString, ApplicationDbContext ctx, DiceRollData diceRolls, out Action action)
        {
            bool result;
            // todo: "And the target must make a DC x [type] saving throw"
            if (actionString.IndexOf("<em>Hit:</em>") >= 0)
            {
                ctx.Attacks.Add(AttackParser.TryParse(actionString, ctx, diceRolls, out action));
                result = true;
            }
            else if (SubActionTypesParser.TryParse(actionString, ctx, out action))
                result = true;
            else
            {
                // This **MUST** come last
                var basicMatch = BasicActionRegex.Match(actionString);
                if (basicMatch.Success)
                {
                    action = new Action
                    {
                        Name = basicMatch.Groups[miBasicName].Value,
                        Description = basicMatch.Groups[miBasicDesc].Value
                    };
                    result = true;
                }
                else
                {
                    result = false;
                    action = null;
                }
            }

            return result;
        }
    }
}
