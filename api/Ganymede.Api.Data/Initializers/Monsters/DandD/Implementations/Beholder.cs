using Ganymede.Api.Data.Common;
using Ganymede.Api.Data.Monsters;
using Ganymede.Api.Data.Monsters.Actions;
using Ganymede.Api.Data.Monsters.BasicStats;
using Ganymede.Api.Data.Monsters.OptionalStats;
using Ganymede.Api.Data.Monsters.OptionalStats.Languages;
using Ganymede.Api.Data.Monsters.SpecialTraits;
using System.Collections.Generic;
using static Ganymede.Api.Data.Initializers.Monsters.MonsterConfigurationData;
using static Ganymede.Api.Data.Initializers.Monsters.MonstersInitializer;

namespace Ganymede.Api.Data.Initializers.Monsters.DandD.Implementations
{
    internal class Beholder : MonsterCreator
    {
        protected override DiceRoll HitDice => _diceRolls.NinteenDTen;
        protected override string Name => "Beholder";
        protected override MonsterType MonsterType => MonstersConstants.MTAbberation;
        protected override int Size => MonstersConstants.SLarge;

        public Beholder(MonsterInitializationData data) : base(data) { }

        protected override AbilityScores CreateAbilties()
        {
            return new AbilityScores
            {
                Strength = 10,
                Dexterity = 14,
                Constitution = 18,
                Intelligence = 17,
                Wisdom = 15,
                Charisma = 17
            };
        }
        protected override MonsterMovement CreateMovement()
        {
            return new MonsterMovement
            {
                Fly = 20,
                CanHover = true
            };
        }
        protected override ArmorClass CreateArmor()
        {
            return new ArmorClass
            {
                NaturalArmorModifier = 6
            };
        }
        protected override OptionalStatsSet CreateOptionalStats()
        {
            return new OptionalStatsSet
            {
                SavingThrows = new MonsterSavingThrowSet
                {
                    Intelligence = true,
                    Wisdom = true,
                    Charisma = true
                },
                Effectivenesses = new DamageEffectivenessSet
                {
                    ConditionImmunities = new int[]
                    {
                        MonstersConstants.CProne
                    }
                },
                Senses = new Senses
                {
                    Darkvision = 120,
                    PassivePerceptionOverride = 22
                },
                Languages = new MonsterLanguageSet { },
                CRAdjustment = 4
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
                        Name = "Antimagic Cone",
                        Description = "<p>The beholder's central eye creates an area of antimagic, as in the <em>anti magic field</em> spell, in a 150-foot cone. At the start of each of its turns, the beholder decides which way the cone faces and whether the cone is active. The area works against the beholder's own eye rays.</p>"
                    }
                }
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
                HitEffects = new List<HitEffect>
                {
                    new HitEffect
                    {
                        Damage = _diceRolls.FourDSix,
                        DamageType = MonstersConstants.DTPiercing
                    }
                },
                Target = MonstersConstants.TTarget,
                RangeType = MonstersConstants.RTMelee
            };

            return new ActionsSet
            {
                Actions = new List<Action>
                {
                    bite.Action,
                    new Action
                    {
                        Name = "Eye Rays",
                        Description =
                            "<p>The beholder shoots three of the following magical eye rays at random (reroll duplicates), choosing one to three targets it can see within 120 feet of it:</p>" +
                            "<ol>" +
                                "<li><em>Charm Ray.</em><p>The targeted creature must succeed on a DC 16 Wisdom saving throw or be charmed by the beholder for 1 hour, or until the beholder harms the creature.</p></li>" +
                                "<li><em>Paralyzing Ray.</em><p>The targeted creature mu st succeed on a DC 16 Constitution saving throw or be paralyzed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.</p></li>" +
                                "<li><em>Fear Ray.</em><p>The targeted creature must succeed on a DC 16 Wisdom saving throw or be frightened for 1 minute.The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.</p></li>" +
                                "<li><em>Slowing Ray.</em><p>The targeted creature must succeed on a DC 16 Dexterity saving throw. On a failed save, the target's speed is halved for 1 minute.In addition, the creature can't take reactions, and it can take either an action or a bonus action on its turn, not both.The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. </ li></p>" +
                                "<li><em>Enervation Ray.</em><p>The targeted creature must make a DC 16 Constitution saving throw, taking 36 (8d8) necrotic damage on a failed save, or half as much damage on a successful one.</p></li>" +
                                "<li><em>Telekinetic Ray.</em><p>If the target is a creature, it must succeed on a DC 16 Strength saving throw or the beholder moves it up to 30 feet in any direction. It is restrained by the ray's telekinetic grip until the start of the beholder's next turn or until the beholder is incapacitated.</p>" +
                                    "<p>If the target is an object weighing 300 pounds or less that isn't being worn or carried, it is moved up to 30 feet in any direction. The beholder can also exert fine control on objects with this ray, such as manipulating a simple tool or opening a door or a container.</p></li>" +
                                "<li><em>Sleep Ray.</em><p>The targeted creature must succeed on a DC 16 Wisdom saving throw or fall asleep and remain unconscious for 1 minute. The target awakens if it takes damage or another creature takes an action to wake it.This ray has no effect on constructs and undead.</p></li>" +
                                "<li><em>Petrification Ray.</em><p>The targeted creature must make a DC 16 Dexterity saving throw. On a failed save, the creature begins to turn to stone and is restrained. It must repeat the saving throw at the end of its next turn. On a success, the effect ends. On a failure , the creature is petrified until freed by the greater restoration spell or other magic.</p></li>" +
                                "<li><em>Disintigration Ray.</em><p> If the target is a creature, it must succeed on a DC 16 Dexterity saving throw or take 45 (10d8) force damage. If this damage reduces the creature to 0 hit points, its body becomes a pile of fine gray dust.</p><p>If the target is a Large or smaller non magical object or creation of magical force, it is disintegrated without a saving throw. If the target is a Huge or larger object or creation of magical force, this ray disintegrates a 10-foot cube of it.</p></li>" +
                                "<li><em>Death Ray.</em><p>The targeted creature must succeed on a DC 16 Dexterity saving throw or take 55 (10d10) necrotic damage. The target dies if the ray reduces it to 0 hit points.</p></li>" +
                            "</ol>"
                    }
                }
            };
        }
        protected override LegendaryActionsSet CreateLegendaryActionsSet()
        {
            var eyeRay = new LegendaryAction
            {
                ActionCost = 1,
                Action = new Action
                {
                    Name = "Eye Ray",
                    Description = "The beholder uses one random eye ray.",
                }
            };
            return new LegendaryActionsSet
            {
                DescriptionOverride = "<p>The beholder can take 3 legendary actions, using the Eye Ray option. It can take only one legendary action at a time and only at the end of another creature's turn. The beholder regains spent legendary actions at the start of its turn.</p>",
                LegendaryActionCount = 3,
                Actions = new List<Action>
                {
                    eyeRay.Action
                }
            };
        }
        protected override List<Alignment> CreateAlignments()
        {
            return new List<Alignment>
            {
                _alignments.LawfulEvil
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

        protected override List<Language> CreateLangauges()
        {
            return new List<Language>
            {
                _languages.DeepSpeech,
                _languages.Undercommon
            };
        }
    }
}
