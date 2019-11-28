using System.Collections.Generic;
using Ganymede.Api.Data.Common;
using Ganymede.Api.Data.Equipment;
using Ganymede.Api.Data.Monsters;
using Ganymede.Api.Data.Monsters.Actions;
using Ganymede.Api.Data.Monsters.OptionalStats;
using Ganymede.Api.Data.Monsters.OptionalStats.Languages;
using static Ganymede.Api.Data.Initializers.Monsters.MonstersInitializer;

namespace Ganymede.Api.Data.Initializers.Monsters.DandD.Implementations
{
    internal class Bandit : MonsterCreator
    {
        protected override DiceRoll HitDice => _diceRolls.TwoDEight;
        protected override string Name => "Bandit";
        protected override MonsterType MonsterType => MonstersConstants.MTHumanoid;
        protected override int Size => MonstersConstants.SMedium;

        public Bandit(MonsterInitializationData data) : base(data) { }

        protected override AbilityScores CreateAbilties()
        {
            return new AbilityScores
            {
                Strength = 11,
                Dexterity = 12,
                Constitution = 12,
                Intelligence = 10,
                Wisdom = 10,
                Charisma = 10
            };
        }

        protected override List<Action> CreateActions()
        {
            var scimitar = new Attack
            {
                Action = new Action
                {
                    Name = "Scimitar"
                },
                HitEffects = new List<HitEffect>()
                {
                    new HitEffect
                    {
                        Damage = _diceRolls.OneDSix,
                        DamageType = MonstersConstants.DTSlashing
                    }
                },
                Target = MonstersConstants.TTarget,
                Type = MonstersConstants.WAMelee
            };
            var lCrossbow = new Attack
            {
                Action = new Action
                {
                    Name = "Light Crossbow"
                },
                HitEffects = new List<HitEffect>
                {
                    new HitEffect
                    {
                        Damage = _diceRolls.OneDEight,
                        DamageType = MonstersConstants.DTPiercing
                    }
                },
                RangeMin = 80,
                RangeMax = 320
            };

            return new List<Action>
            {
                scimitar.Action,
                lCrossbow.Action
            };
        }

        protected override List<Alignment> CreateAlignments()
        {
            return new List<Alignment>
            {
                _alignments.LawfulGood,
                _alignments.LawfulNeutral,
                _alignments.LawfulEvil,
                _alignments.NeutralGood,
                _alignments.Neutral,
                _alignments.NeutralEvil,
                _alignments.ChaoticGood,
                _alignments.ChaoticNeutral,
                _alignments.ChaoticEvil
            };
        }

        protected override List<Tag> CreateTags()
        {
            return new List<Tag>
            {
                MonstersConstants.TAnyRace
            };
        }

        protected override List<Armor> CreateArmors()
        {
            return new List<Armor>
            {
                _armors.Leather
            };
        }

        protected override OptionalStatsSet CreateOptionalStats()
        {
            return new OptionalStatsSet
            {
                Languages = new MonsterLanguageSet
                {
                    Special = "any one language (usually Common)"
                }
            };
        }
    }
}
