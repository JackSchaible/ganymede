using System.Collections.Generic;
using Ganymede.Api.Data.Common;
using Ganymede.Api.Data.Monsters;
using Ganymede.Api.Data.Monsters.Actions;
using Ganymede.Api.Data.Monsters.BasicStats;
using Ganymede.Api.Data.Monsters.OptionalStats;
using Ganymede.Api.Data.Monsters.SpecialTraits;
using static Ganymede.Api.Data.Initializers.Monsters.MonsterConfigurationData;

namespace Ganymede.Api.Data.Initializers.Monsters.DandD.Implementations
{
    internal class AdultRedDragon : MonsterCreator
    {
        protected override DiceRoll HitDice => _diceRolls.TwentyEightDTwenty;
        protected override string Name => "Adult Red Dragon";
        protected override MonsterType MonsterType => MonstersConstants.MTDragon;
        protected override int Size => MonstersConstants.SGargantuan;

        public AdultRedDragon(MonsterInitializationData data) : base(data) { }

        protected override AbilityScores CreateAbilties() => new AbilityScores
        {
            Strength = 30,
            Dexterity = 10,
            Constitution = 29,
            Intelligence = 18,
            Wisdom = 15,
            Charisma = 23
        };

        protected override ArmorClass CreateArmor()
        {
            return new ArmorClass
            {
                NaturalArmorModifier = 12
            };
        }

        protected override MonsterMovement CreateMovement()
        {
            return new MonsterMovement
            {
                Ground = 40,
                Climb = 40,
                Fly = 80
            };
        }

        protected override OptionalStatsSet CreateOptionalStats()
        {
            return new OptionalStatsSet
            {
                SavingThrows = new MonsterSavingThrowSet
                {
                    Dexterity = true,
                    Constitution = true,
                    Wisdom = true,
                    Charisma = true
                },
                Effectivenesses = new DamageEffectivenessSet
                {
                    Immunities = new int[]
                    {
                        MonstersConstants.DTFire
                    }
                },
                Senses = new Senses
                {
                    Blindsight = 60,
                    Darkvision = 120,
                    PassivePerceptionOverride = 26
                }
            };
        }

        protected override SpecialTraitsSet CreateSpecialTraitsSet()
        {
            return new SpecialTraitsSet
            {
                LegendaryResistancesPerDay = 3
            };
        }

        protected override ActionsSet CreateActionsSet()
        {
            return new ActionsSet
            {
                Multiattack = "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.",
                Actions = new List<Action>
                {
                    new Attack
                    {
                        Action = new Action
                        {
                            Name = "Bite"
                        },
                        RangeType = MonstersConstants.RTMelee,
                        RangeMin = 15,
                        Target = MonstersConstants.TTarget,
                        HitEffects = new List<HitEffect>
                        {
                            new HitEffect
                            {
                                Damage = _diceRolls.TwoDTen,
                                DamageType = MonstersConstants.DTPiercing
                            },
                            new HitEffect
                            {
                                Damage = _diceRolls.FourDSix,
                                DamageType = MonstersConstants.DTFire
                            }
                        }
                    }.Action,
                    new Attack
                    {
                        Action = new Action
                        {
                            Name = "Claw"
                        },
                        RangeType = MonstersConstants.RTMelee,
                        RangeMin = 10,
                        Target = MonstersConstants.TTarget,
                        HitEffects = new List<HitEffect>
                        {
                            new HitEffect
                            {
                                Damage = _diceRolls.TwoDSix,
                                DamageType = MonstersConstants.DTSlashing
                            }
                        }
                    }.Action,
                    new Attack
                    {
                        Action = new Action
                        {
                            Name = "Tail"
                        },
                        RangeType = MonstersConstants.RTMelee,
                        RangeMin = 20,
                        Target = MonstersConstants.TTarget,
                        HitEffects = new List<HitEffect>
                        {
                            new HitEffect
                            {
                                Damage = _diceRolls.TwoDEight,
                                DamageType = MonstersConstants.DTBludgeoning
                            }
                        }
                    }.Action,
                    new Action
                    {
                        Name = "Frightful Presence",
                        Description = "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 21 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
                    },
                    new RechargeAction
                    {
                        Action = new Action
                        {
                            Name = "Fire Breath",
                            Description = "The dragon exhales fire in a 90-foot cone. Each creature in that area must make a DC 24 Dexterity saving throw, taking 91 (26d6) fire damage on a failed save, or half as much damage on a successful one."
                        },
                        RechargeMin = 5,
                        RechargeMax = 6,
                        RechargesOn = MonstersConstants.RCRoll
                    }.Action
                }
            };
        }

        protected override LegendaryActionsSet CreateLegendaryActionsSet()
        {
            return new LegendaryActionsSet
            {
                Actions = new List<Action>
                {
                    new LegendaryAction
                    {
                        Action = new Action
                        {
                            Name = "Detect",
                            Description = "The dragon makes a Wisdom (Perception) check."
                        },
                        ActionCost = 1
                    }.Action,
                    new LegendaryAction
                    {
                        Action = new Action
                        {
                            Name = "Tail Attack",
                            Description = "The dragon makes a tail attack"
                        },
                        ActionCost = 1
                    }.Action,
                    new LegendaryAction
                    {
                        Action = new Action
                        {
                            Name = "Wing Attack",
                            Description = "The dragon beats its wings. Each creature within 15 feet of the dragon must succeed on a DC 25 Dexterity saving throw or take 17 (2d6 + 10) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
                        },
                        ActionCost = 2
                    }.Action,
                    new Action
                    {
                        Description = "<p>Magma erupts from a point on the ground the dragon can see within 120 feet of it, creating a 20-foot-high, 5-foot-radius geyser. Each creature in the geyser's area must make a DC 15 Dexterity saving throw, taking 21 (6d6) fire damage on a failed save, or half as much damage on a successful one.</p>",
                        Lair = true
                    },
                    new Action
                    {
                        Description = "<p>A tremor shakes the lair in a 60-foot radius around the dragon. Each creature other than the dragon on the ground in that area must succeed on a DC 15 Dexterity saving throw or be knocked prone.</p>",
                        Lair = true
                    },
                    new Action
                    {
                        Description = "<p>Volcanic gases form a cloud in a 20-foot-radius sphere centered on a point the dragon can see within 120 feet of it. The sphere spreads a round corners, and its area is lightly obscured. It lasts until initiative count 20 on the next round. Each creature that starts its turn in the cloud must succeed on a DC 13 Constitution saving throw or be poisoned until the end of its turn. While poisoned in this way, a creature is incapacitated.</p>",
                        Lair = true
                    }
                },
                RegionalEffects = 
                "<p>The region containing a legendary red dragon's lair is warped by the dragon's magic, which creates one or more of the following effects:</p>" +
                "<ul>" +
                    "<li>Small earthquakes are common within 6 miles of the dragon's lair.</li>" +
                    "<li>Water sources within 1 mile of the lair are supernaturally warm and tainted by sulfur.</li>" +
                    "<li>Rocky fissures within 1 mile of the dragon's lair form portals to the Elemental Plane of Fire, allowing creatures of elemental fire into the world to dwell nearby.</li>" +
                "</ul>" +
                "<p>If the dragon dies, these effects fade over the course of 1d10 days."
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
                },
                new MonsterSkillSet
                {
                    Skill = _skills.Stealth
                }
            };
        }
        protected override List<Language> CreateLangauges()
        {
            return new List<Language>
            {
                _languages.Common,
                _languages.Draconic
            };
        }
    }
}
