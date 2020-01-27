using Ganymede.Api.Data.Common;
using Ganymede.Api.Data.Monsters.Actions;
using Ganymede.Api.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Action = Ganymede.Api.Data.Monsters.Actions.Action;

namespace Ganymede.Api.Data.Initializers.Monsters.DandD.SRD.Parsers.ActionParsers
{
    internal class AttackParser
    {
        private readonly Regex AttackHitRegex = new Regex("<strong>(.*)\\.</strong> (?:<em>)?(Melee or <em>Ranged|Melee|Ranged) (Weapon|Spell) Attack:(?:</em>)?(?:</em>)? .[0-9]* to hit, (?:reach|range) ([0-9]*)(?:/([0-9]*))? ft.(?: or (?:reach|range) ([0-9]*)(?:/([0-9]*))? ft.)?, one (.*)?(target|creature).");
        private readonly Regex HitEffectRegex = new Regex("[0-9]* \\(([0-9]*)d([0-9]*)(?: (\\+ [0-9]*))?\\) (\\w*) damage.(?: (.*))?");

        public Attack Parse(string attackString, ApplicationDbContext ctx)
        {
            Attack attack = null;

            if (attackString.IndexOf("<em>Hit:</em>") >= 0)
            {
                attack = new Attack
                {
                    HitEffects = new List<HitEffect>()
                };

                var split = attackString.Split("<em>Hit:</em>");
                var attackHitString = split[0];
                var hitEffectsString = split[1];

                ParseHit(attack, attackHitString);

                // TODO: split hit effects
                var hitEffects = hitEffectsString.Split("");
                foreach (var hitEffect in hitEffects)
                    attack.HitEffects.Add(ParseHitEffect(hitEffect, ctx));
            }

            return attack;
        }

        private Attack ParseHit(Attack attack, string hit)
        {
            var match = AttackHitRegex.Match(hit);

            attack.Action = new Action { Name = match.Groups[1].Value };
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

        private HitEffect ParseHitEffect(string effectString, ApplicationDbContext ctx)
        {
            var match = HitEffectRegex.Match(effectString);
            HitEffect effect = new HitEffect();
            if (match.Success)
            {
                var diceRoll = new DiceRoll
                {
                    Number = int.Parse(match.Groups[1].Value),
                    Sides = int.Parse(match.Groups[2].Value)
                };

                effect.Damage = ctx.DiceRolls.FirstOrDefault(dr => dr.Number == diceRoll.Number && dr.Sides == diceRoll.Sides)
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
