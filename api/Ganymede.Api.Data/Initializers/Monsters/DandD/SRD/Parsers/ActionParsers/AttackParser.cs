using Ganymede.Api.Data.Common;
using Ganymede.Api.Data.Initializers.InitializerData;
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
        private static readonly Regex
            AttackHitRegex = new Regex(@"<strong>(.*)\.</strong> (?:<em>)?(Melee or <em>Ranged|Melee|Ranged) (Weapon|Spell) Attack:(?:</em>)?(?:</em>)? .[0-9]* to hit(.*)?, (?:reach|range) ([0-9]*)(?:/([0-9]*))? ft.(?: or (?:reach|range) ([0-9]*)(?:/([0-9]*))? ft.)?, one (.*)?(target|creature)."),
            HitEffectRegex = new Regex(@"[0-9]* \(([0-9]*)d([0-9]*)(?: (\+ [0-9]*))?\) (\w*) damage.(?: (.*))?"),
            DoesNotHaveExtraHitEffectsRegex = new Regex(@"[0-9]+ \([0-9]+d[0-9]+(?: (?:\+|-) [0-9]+)?\) \w+ damage(?!,)\.(?: .+)?");

        //mia = {A}ttack hit {m}atch {i}ndex, hemi = {H}it effect {m}atch {i}ndex
        private static readonly int
            mihHitDamageNumber = 1,
            mihDamageSides = 2,
            mihDamageType = 4,
            mihExtraEffect = 5,
            miaName = 1,
            miaRangeType = 2,
            miaAttackType = 3,
            miaConditionalHit = 4,
            miaReachOrRangeMin = 5,
            miaRangeMax = 6,
            miaMeleeOrRangedRangeMin = 7,
            miaMeleeOrRangedRangeMax = 8,
            miaTargetConditions = 9,
            miaTargetType = 10;

        public static Attack TryParse(string attackString, ApplicationDbContext ctx, DiceRollData diceRolls, out Action action)
        {
            Attack attack = new Attack
            {
                HitEffects = new List<HitEffect>()
            };

            var split = attackString.Split("<em>Hit:</em>");
            var attackHitString = split[0];
            var hitEffectsString = split[1];

            ParseHit(attack, attackHitString, out action);

            // If true, the hit effect has extra text (i.e., extra poison damage, etc.)
            // If false, there *should* be multiple hit effects
            string[] hitEffects;
            if (DoesNotHaveExtraHitEffectsRegex.IsMatch(hitEffectsString))
                hitEffects = new[] { hitEffectsString };
            else
                hitEffects = hitEffectsString.Split(",");

            foreach (var hitEffect in hitEffects)
                attack.HitEffects.Add(ParseHitEffect(hitEffect, ctx, diceRolls));

            return attack;
        }

        private static Attack ParseHit(Attack attack, string hit, out Action action)
        {
            var match = AttackHitRegex.Match(hit);

            if (!match.Success)
                throw new Exception("AttackHitRegex Fails!");

            attack.Action = action = new Action { Name = match.Groups[miaName].Value };
            attack.RangeType = match.Groups[miaRangeType].Value switch
            {
                "Melee or <em>Ranged" => MonsterConfigurationData.MonstersConstants.RTMeleeOrRanged,
                "Melee" => MonsterConfigurationData.MonstersConstants.RTMelee,
                "Ranged" => MonsterConfigurationData.MonstersConstants.RTRanged,
                _ => throw new Exception($"Unknown range type '{match.Groups[miaRangeType].Value}'"),
            };
            attack.TargetConditions = match.Groups[miaTargetConditions].Value;
            attack.Target = int.Parse(GetConfigPropertyByName($"T{match.Groups[miaTargetType].Value.Capitalize()}"));
            attack.AttackType = match.Groups[miaAttackType].Value switch
            {
                "Weapon" => MonsterConfigurationData.MonstersConstants.ATWeapon,
                "Spell" => MonsterConfigurationData.MonstersConstants.ATSpell,
                _ => throw new Exception($"Unknown attack type '{match.Groups[miaAttackType].Value}'"),
            };
            if (attack.AttackType == MonsterConfigurationData.MonstersConstants.ATWeapon)
            {
                if (attack.RangeType == MonsterConfigurationData.MonstersConstants.RTMelee)
                {
                    attack.RangeMin = 0;
                    attack.RangeMax = int.Parse(match.Groups[miaReachOrRangeMin].Value);
                }
                else if (attack.RangeType == MonsterConfigurationData.MonstersConstants.RTRanged)
                {
                    attack.RangeMin = int.Parse(match.Groups[miaReachOrRangeMin].Value);
                    attack.RangeMax = int.Parse(match.Groups[miaRangeMax].Value);
                }
                else
                {
                    attack.RangeMin = int.Parse(match.Groups[miaMeleeOrRangedRangeMin].Value);
                    attack.RangeMax = int.Parse(match.Groups[miaMeleeOrRangedRangeMax].Value);
                }
            }
            else
            {
                if (attack.RangeType == MonsterConfigurationData.MonstersConstants.RTMelee
                    || attack.RangeType == MonsterConfigurationData.MonstersConstants.RTRanged)
                {
                    attack.RangeMin = 0;
                    attack.RangeMax = int.Parse(match.Groups[miaReachOrRangeMin].Value);
                }
                else
                    throw new Exception($"Unknown range type for spells '{attack.RangeType}'");
            }
            
            attack.TargetConditions = match.Groups[miaConditionalHit].Value;

            return attack;
        }

        private static HitEffect ParseHitEffect(string effectString, ApplicationDbContext ctx, DiceRollData diceRolls)
        {
            var match = HitEffectRegex.Match(effectString);
            HitEffect effect = new HitEffect();
            if (match.Success)
            {
                var diceRoll = new DiceRoll
                {
                    Number = int.Parse(match.Groups[mihHitDamageNumber].Value),
                    Sides = int.Parse(match.Groups[mihDamageSides].Value)
                };

                effect.Damage = diceRolls.All.FirstOrDefault(dr => dr.Number == diceRoll.Number && dr.Sides == diceRoll.Sides);
                if (effect.Damage == null)
                {
                    effect.Damage = diceRoll;
                    diceRolls.All.Add(diceRoll);
                }

                effect.DamageType = int.Parse(GetConfigPropertyByName($"DT{match.Groups[mihDamageType].Value.Capitalize()}"));

                if (match.Groups.Count >= mihExtraEffect)
                    effect.ExtraEffect = match.Groups[mihExtraEffect].Value;

                // TODO: Condition?
            }
            else
                effect.ExtraEffect = effectString;

            return effect;
        }

        private string GetConfigPropertyByName(string name) => typeof(MonsterConfigurationData.MonstersConstants).GetField(name).GetValue(null).ToString();
    }
}
