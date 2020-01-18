using Ganymede.Api.Data.Common;
using Ganymede.Api.Data.Monsters.Actions;
using Ganymede.Api.Extensions;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Action = Ganymede.Api.Data.Monsters.Actions.Action;

namespace Ganymede.Api.Data.Initializers.Monsters.DandD.SRD.Parsing
{
    internal class ActionSetParser
    {
        private readonly Regex _attackHitRegex = new Regex("<strong>(.*)\\.</strong> (?:<em>)?(Melee or <em>Ranged|Melee|Ranged) (Weapon|Spell) Attack:(?:</em>)?(?:</em>)? .[0-9]* to hit, (?:reach|range) ([0-9]*)(?:/([0-9]*))? ft.(?: or (?:reach|range) ([0-9]*)(?:/([0-9]*))? ft.)?, one (.*)?(target|creature).");
        private readonly Regex _hitEffectRegex = new Regex("[0-9]* \\(([0-9]*)d([0-9]*)(?: (\\+ [0-9]*))?\\) (\\w*) damage.(?: (.*))?");
        private readonly Regex _multiAttackRegex = new Regex("<strong>Multiattack\\.</strong> (.*)");

        private ApplicationDbContext _ctx;

        public ActionsSet Parse(HtmlDocument doc, ApplicationDbContext ctx)
        {
            _ctx = ctx;

            var text = doc.Text;
            var actionsSet = new ActionsSet();

            var test = new Regex("Adult Red Dragon").Match(text);
            var actions = GetActions(text, actionsSet);

            return actionsSet;
        }

        private List<Action> GetActions(string doc, ActionsSet set)
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

                    foreach (var action in actionsList)
                    {
                        //TODO: If "action" is just a continuation of the last attack's descriptor, add it to the previous description?
                        actions.Add(ParseAction(action));
                    }
                }
            }

            return actions;
        }

        private List<string> ParseMultiattack(List<string> actions, ActionsSet set)
        {
            var match = _multiAttackRegex.Match(actions[0]);
            if (match.Success)
                set.Multiattack = match.Groups[1].Value;
            actions.RemoveAt(0);

            return actions;
        }

        private Action ParseAction(string actionString)
        {
            var action = new Action();

            // TODO: Determine action type
            ParseAttack(actionString, action);

            return action;
        }

        private Attack ParseAttack(string attackString, Action action)
        {
            var attack = new Attack
            {
                Action = action,
                HitEffects = new List<HitEffect>()
            };

            if (attackString.IndexOf("<em>Hit:</em>") >= 0)
            {
                var split = attackString.Split("<em>Hit:</em>");
                var attackHitString = split[0];
                var hitEffectsString = split[1];

                ParseHit(attack, attackHitString);

                // TODO: split hit effects
                var hitEffects = hitEffectsString.Split("");
                foreach (var hitEffect in hitEffects)
                    attack.HitEffects.Add(ParseHitEffect(hitEffect));
            }

            return attack;
        }

        private Attack ParseHit(Attack attack, string hit)
        {
            var match = _attackHitRegex.Match(hit);

            attack.Action.Name = match.Groups[1].Value;
            switch (match.Groups[2].Value)
            {
                case "Melee or <em>Ranged":
                    attack.RangeType = MonsterConfigurationData.MonstersConstants.RTMeleeOrRanged;
                    break;

                case "Melee":
                    attack.RangeType = MonsterConfigurationData.MonstersConstants.RTMelee;
                    break;

                case "Ranged":
                    attack.RangeType = MonsterConfigurationData.MonstersConstants.RTRanged;
                    break;

                default:
                    throw new Exception($"Unknown range type '{match.Groups[2].Value}'");
            }

            attack.TargetConditions = match.Groups[8].Value;
            attack.Target = int.Parse(GetConfigPropertyByName($"T{match.Groups[9].Value.Capitalize()}"));

            switch (match.Groups[3].Value)
            {
                case "Weapon":
                    attack.AttackType = MonsterConfigurationData.MonstersConstants.ATWeapon;
                    break;

                case "Spell":
                    attack.AttackType = MonsterConfigurationData.MonstersConstants.ATSpell;
                    break;

                default:
                    throw new Exception($"Unknown attack type '{match.Groups[3].Value}'");
            }

            if (attack.AttackType == MonsterConfigurationData.MonstersConstants.ATWeapon)
            {
                if (attack.RangeType == MonsterConfigurationData.MonstersConstants.RTMelee)
                {
                    attack.RangeMin = 0;
                    attack.RangeMax = int.Parse(match.Groups[4].Value);
                }
                else if (attack.RangeType == MonsterConfigurationData.MonstersConstants.RTRanged)
                {
                    attack.RangeMin = int.Parse(match.Groups[4].Value);
                    attack.RangeMax = int.Parse(match.Groups[5].Value);
                }
                else
                {
                    attack.RangeMin = int.Parse(match.Groups[6].Value);
                    attack.RangeMax = int.Parse(match.Groups[7].Value);
                }
            }
            else
            {
                if (attack.RangeType == MonsterConfigurationData.MonstersConstants.RTMelee
                    || attack.RangeType == MonsterConfigurationData.MonstersConstants.RTRanged)
                {
                    attack.RangeMin = 0;
                    attack.RangeMax = int.Parse(match.Groups[4].Value);
                }
                else
                    throw new Exception($"Unknown range type for spells '{attack.RangeType}'");
            }

            return attack;
        }

        private HitEffect ParseHitEffect(string effectString)
        {
            var match = _hitEffectRegex.Match(effectString);
            HitEffect effect = new HitEffect();
            if (match.Success)
            {
                var diceRoll = new DiceRoll
                {
                    Number = int.Parse(match.Groups[1].Value),
                    Sides = int.Parse(match.Groups[2].Value)
                };

                effect.Damage = _ctx.DiceRolls.FirstOrDefault(dr => dr.Number == diceRoll.Number && dr.Sides == diceRoll.Sides)
                            ?? diceRoll;
                effect.DamageType = int.Parse(GetConfigPropertyByName($"DT{match.Groups[4].Value.Capitalize()}"));

                if (match.Groups.Count >= 5)
                    effect.ExtraEffect = match.Groups[5].Value;

                // TODO: Condition?
            }
            else
                effect.ExtraEffect = effectString;

            return effect;
        }

        private string GetConfigPropertyByName(string name) => typeof(MonsterConfigurationData.MonstersConstants).GetField(name).GetValue(null).ToString();

    }
}
