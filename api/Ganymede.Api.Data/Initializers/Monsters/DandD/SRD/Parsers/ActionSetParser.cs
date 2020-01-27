using Ganymede.Api.Data.Monsters.Actions;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using Action = Ganymede.Api.Data.Monsters.Actions.Action;

namespace Ganymede.Api.Data.Initializers.Monsters.DandD.SRD.Parsing
{
    internal class ActionSetParser
    {
        private Regex DiceRegex = new Regex("([0-9]+)d([0-9])");
        private Regex ActionNameRegex = new Regex("<strong>(.+)</strong>");
        private Regex WeaponTypeAttackRegex = new Regex("<em>(Melee|Ranged) Weapon Attack:</em>");
        private Regex SpecialGrappleRuleRegex = new Regex("grappled \\(escape DC [0-9]+\\)");

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
            var actionsList = ExtractActions(actionsString);

            foreach(var actionString in actionsList)
            {
                var action = new Action
                {
                    Name = ActionNameRegex.Match(actionString).Groups[1].Value.TrimEnd('.')
                };

                var weaponAttackMatch = WeaponTypeAttackRegex.Match(actionString);
                if (weaponAttackMatch.Success)
                    action = GetWeaponAttack(action, weaponAttackMatch, actionString);
                else
                    throw new Exception("What other kind of actions could there be?");
            }

            return actions;
        }

        private Action GetWeaponAttack(Action action, Match weaponAttackMatch, string actionString)
        {
            var attack = new Attack
            {
                Type = weaponAttackMatch.Groups[1].Value == "Melee"
                    ? MonsterConfigurationData.MonstersConstants.WAMelee
                    : weaponAttackMatch.Groups[1].Value == "Ranged"
                    ? MonsterConfigurationData.MonstersConstants.WARanged
                    : weaponAttackMatch.Groups[1].Value == "Melee or Ranged"
                    ? MonsterConfigurationData.MonstersConstants.WAMeleeOrRanged
                    : throw new Exception($"Unable to determine attack type {weaponAttackMatch.Groups[1].Value}")
            };

            string[] atomizedStrings = actionString.Split("<em>Hit:</em>");

            if (atomizedStrings.Length != 2)
                throw new Exception($"String breaking failed for action: '{actionString}'");

            string toHitString = atomizedStrings[0];
            string hitEffectsStrings = atomizedStrings[1];



            attack.Action = action;
            return action;
        }

        private Attack GetToHit(string text, Attack attack)
        {


            return attack;
        }

        public string[] ExtractActions(string actionsString)
        {
            var actionsList = actionsString.Split("<br />");

            for (int i = 0; i < actionsList.Length; i++)
            {
                if (!actionsList[i].StartsWith("\n<p>") && !actionsList[i].StartsWith("\n<strong>"))
                {
                    if (i > 0)
                        actionsList[i - 1] += actionsList[i];
                    else
                        throw new Exception("Actions defenition did not start with a p or strong tag.");
                }
            }

            return actionsList;
        }
    }
}
