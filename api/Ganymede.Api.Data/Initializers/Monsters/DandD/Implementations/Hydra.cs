using Ganymede.Api.Data.Common;
using Ganymede.Api.Data.Monsters;
using Ganymede.Api.Data.Monsters.Actions;
using Ganymede.Api.Data.Monsters.BasicStats;
using Ganymede.Api.Data.Monsters.SpecialTraits;
using System.Collections.Generic;
using static Ganymede.Api.Data.Initializers.Monsters.MonstersInitializer;

namespace Ganymede.Api.Data.Initializers.Monsters.DandD.Implementations
{
    internal class Hydra : MonsterCreator
    {
        protected override DiceRoll HitDice => _diceRolls.FifteenDTwelve;
        protected override string Name => "Hydra";
        protected override MonsterType MonsterType => MonstersConstants.MTMonstrosity;
        protected override int Size => MonstersConstants.SHuge;
        protected override ArmorClass CreateArmor() => new ArmorClass { NaturalArmorModifier = 5 };
        protected override MonsterMovement CreateMovement() => new MonsterMovement { Ground = 30, Swim = 30 };

        public Hydra(MonsterInitializationData data) : base(data) { }

        protected override AbilityScores CreateAbilties()
        {
            return new AbilityScores
            {
                Strength = 20,
                Dexterity = 12,
                Constitution = 20,
                Intelligence = 2,
                Wisdom = 10,
                Charisma = 7
            };
        }
        protected override ActionsSet CreateActionsSet()
        {
            var bite = new Attack
            {
                Action = new Action
                {
                    Name = "Bite"
                },
                HitEffects = new List<HitEffect>()
                {
                    new HitEffect
                    {
                        Damage = _diceRolls.OneDTen,
                        DamageType = MonstersConstants.DTPiercing
                    }
                },
                RangeMin = 10,
                Target = MonstersConstants.TTarget,
                Type = MonstersConstants.WAMelee
            };

            return new ActionsSet
            {
                Actions = new List<Action>
                {
                    bite.Action
                },
                Multiattack = "The hydra makes as many bite attacks as it has heads.",
            };
        }
        protected override SpecialTraitsSet CreateSpecialTraitsSet()
        {
            return new SpecialTraitsSet
            {
                SpecialTraits = new List<SpecialTrait>
                {
                    new SpecialTrait
                    {
                        Name = "Hold Breath",
                        Description = "<p>The hydra can hold its breath for 1 hour.</p>"
                    },
                    new SpecialTrait
                    {
                        Name = "Multiple Heads",
                        Description =
                            "<p>The hydra has five heads. While it has more than one head, the hydra has advantage on saving throws against being blinded, charmed, deafened, frightened, stunned, and knocked unconscious.</p>" +
                            "<p>Whenever the hydra takes 25 or more damage in a single turn, one of its heads dies. If all its heads die, the hydra dies.</p>" +
                            "<p>At the end of its turn, it grows two heads for each of its heads that died since its last turn, unless it has taken fire damage since its last turn. The hydra regains 10 hit points for each head regrown in this way.</p>"
                    },
                    new SpecialTrait
                    {
                        Name = "Reactive Heads",
                        Description = "<p>For each head the hydra has beyond one, it gets an extra reaction that can be used only for opportunity attacks.</p>"
                    },
                    new SpecialTrait
                    {
                        Name = "Wakeful",
                        Description = "<p>While the hydra sleeps, at least one of its heads is awake.</p>"
                    }
                }
            };
        }
        protected override List<MonsterSkillSet> CreateSkills()
        {
            return new List<MonsterSkillSet>
            {
                new MonsterSkillSet
                {
                    Skill = _skills.Perception,
                    DoubleProficiency = true
                }
            };
        }
    }
}
