using Ganymede.Api.Data.Initializers.InitializerData;
using Ganymede.Api.Data.Spells;
using System.Collections.Generic;
using System.Linq;

namespace Ganymede.Api.Data.Initializers.Spells
{
    internal class SpellsDnDInitializer
    {
        internal static class SpellConstants
        {
            public static string EncodedComma = "%2CA";

            public static class CastingTimeType
            {
                public const int Action = 0;
                public const int Reaction = 1;
                public const int Time = 2;
                public const int BonusAction = 3;
            }

            public static class DurationType
            {
                public const int Duration = 0;
                public const int Instantaneous = 1;
                public const int Until = 2;
                public const int Special = 3;
            }

            public static class RangeType
            {
                public const int Ranged = 0;
                public const int Self = 1;
                public const int Touch = 2;
                public const int Sight = 3;
                public const int Unlimited = 4;
                public const int Special = 5;
            }
        }

        #region DB IDs for reusable times, durations, etc.
        private CastingTime _t1Action, _t1Hour, _t1Bonus;
        private SpellRange
            _r10f,
            _r30f,
            _r60f,
            _r120f,
            _r150f,
            _rtouch,
            _rself;
        private SpellDuration
            _d1round,
            _d1minute,
            _d1cminute,
            _d10cminutes,
            _d1hour,
            _d1chour,
            _d8hours,
            _dinst,
            _dUT,
            _dUD,
            _dUTD;
        private SpellComponents _cVS, _cV;
        private SpellSchool
            _abjuration,
            _conjuration,
            _divination,
            _enchantment,
            _evocation,
            _illusion,
            _necromancy,
            _transmutation;
        private Campaign _campaign;
        #endregion

        public SpellData Initialize(ApplicationDbContext ctx, Campaign campaign, string rootPath)
        {
            SetSpellMetadata(ctx, campaign);

            var spellData = CreateLevel9Spells(ctx, new SpellData());
            spellData = CreateLevel8Spells(ctx, spellData);
            spellData = CreateLevel7Spells(ctx, spellData);
            spellData = CreateLevel6Spells(ctx, spellData);
            spellData = CreateLevel5Spells(ctx, spellData);
            spellData = CreateLevel4Spells(ctx, spellData);
            spellData = CreateLevel3Spells(ctx, spellData);
            spellData = CreateLevel2Spells(ctx, spellData);
            spellData = CreateLevel1Spells(ctx, spellData);
            spellData = CreateCantrips(ctx, spellData);

            spellData = new SRDSpellsInitializer().Initialize(ctx, spellData, rootPath);

            return spellData;
        }

        #region Spell Data

        public void SetSpellMetadata(ApplicationDbContext ctx, Campaign campaign)
        {
            var schools = CreateDandDSchools(ctx);
            _abjuration = schools.Single(s => s.Name == "Abjuration");
            _conjuration = schools.Single(s => s.Name == "Conjuration");
            _divination = schools.Single(s => s.Name == "Divination");
            _enchantment = schools.Single(s => s.Name == "Enchantment");
            _evocation = schools.Single(s => s.Name == "Evocation");
            _illusion = schools.Single(s => s.Name == "Illusion");
            _necromancy = schools.Single(s => s.Name == "Necromancy");
            _transmutation = schools.Single(s => s.Name == "Transmutation");

            var times = CreateDandDCastingTimes(ctx);
            _t1Action = times[0];
            _t1Hour = times[1];
            _t1Bonus = times[2];

            var ranges = CreateDandDRanges(ctx);
            _r10f = ranges[0];
            _r30f = ranges[1];
            _r60f = ranges[2];
            _r120f = ranges[3];
            _r150f = ranges[4];
            _rtouch = ranges[5];
            _rself = ranges[6];

            var durations = CreateDandDDurations(ctx);
            _d1round = durations[0];
            _d1minute = durations[1];
            _d1cminute = durations[2];
            _d10cminutes = durations[3];
            _d1hour = durations[4];
            _d1chour = durations[5];
            _d8hours = durations[6];
            _dinst = durations[7];
            _dUD = durations[8];
            _dUT = durations[9];
            _dUTD = durations[10];

            var components = CreateDnDSpellComponents(ctx);
            _cVS = components[0];
            _cV = components[1];
            _campaign = campaign;
        }

        private List<SpellSchool> CreateDandDSchools(ApplicationDbContext ctx)
        {
            var schools = new List<SpellSchool>
            {
                new SpellSchool
                {
                    Name = "Abjuration",
                    Description = "Abjuration Spells are protective in Nature, though some of them have aggressive uses. They create magical barriers, negate harmful Effects, harm trespassers, or banish creatures to Other Planes of existence."
                },
                new SpellSchool
                {
                    Name = "Conjuration",
                    Description = "Conjuration Spells involve the transportation of Objects and creatures from one location to another. Some Spells summon creatures or Objects to the caster’s side, whereas others allow the caster to Teleport to another location. Some conjurations create Objects or Effects out of nothing."
                },
                new SpellSchool
                {
                    Name = "Divination",
                    Description = "Divination Spells reveal information, whether in the form of secrets long forgotten, glimpses of the future, the locations of hidden things, the truth behind illusions, or visions of distant people or places."
                },
                new SpellSchool
                {
                    Name = "Enchantment",
                    Description = "Enchantment Spells affect the minds of others, influencing or controlling their behavior. Such Spells can make enemies see the caster as a friend, force creatures to take a course of action, or even control another creature like a puppet."
                },
                new SpellSchool
                {
                    Name = "Evocation",
                    Description = "Evocation Spells manipulate magical energy to produce a desired effect. Some call up blasts of fire or lightning. Others channel positive energy to heal wounds."
                },
                new SpellSchool
                {
                    Name = "Illusion",
                    Description = "Illusion Spells deceive the Senses or minds of others. They cause people to see things that are not there, to miss things that are there, to hear Phantom noises, or to remember things that never happened. Some illusions create Phantom images that any creature can see, but the most insidious illusions plant an image directly in the mind of a creature."
                },
                new SpellSchool
                {
                    Name = "Necromancy",
                    Description = "Necromancy Spells manipulate the energies of life and death. Such Spells can grant an extra reserve of life force, drain the life energy from another creature, create the Undead, or even bring the dead back to life. Creating the Undead through the use of Necromancy Spells such as Animate Dead is not a good act, and only evil casters use such Spells frequently."
                },
                new SpellSchool
                {
                    Name = "Transmutation",
                    Description = "Transmutation Spells change the properties of a creature, object, or Environment. They might turn an enemy into a harmless creature, bolster the Strength of an ally, make an object move at the caster’s Command, or enhance a creature’s innate Healing Abilities to rapidly recover from injury."
                },
            };

            ctx.SpellSchools.AddRange(schools);
            return schools;
        }

        private List<CastingTime> CreateDandDCastingTimes(ApplicationDbContext ctx)
        {
            List<CastingTime> times = new List<CastingTime>
            {
                new CastingTime
                {
                    Type = SpellConstants.CastingTimeType.Action
                },
                new CastingTime
                {
                    Amount = 1,
                    Unit = "hour",
                    Type = SpellConstants.CastingTimeType.Time
                },
                new CastingTime
                {
                    Type = SpellConstants.CastingTimeType.BonusAction
                }
            };
            ctx.CastingTimes.AddRange(times);

            return times;
        }

        private List<SpellRange> CreateDandDRanges(ApplicationDbContext ctx)
        {
            List<SpellRange> ranges = new List<SpellRange>
            {
                new SpellRange
                {
                    Amount = 10,
                    Unit = "feet",
                    Type = SpellConstants.RangeType.Ranged
                },
                new SpellRange
                {
                    Amount = 30,
                    Unit = "feet",
                    Type = SpellConstants.RangeType.Ranged
                },
                new SpellRange
                {
                    Amount = 60,
                    Unit = "feet",
                    Type = SpellConstants.RangeType.Ranged
                },
                new SpellRange
                {
                    Amount = 120,
                    Unit = "feet",
                    Type = SpellConstants.RangeType.Ranged
                },
                new SpellRange
                {
                    Amount = 150,
                    Unit = "feet",
                    Type = SpellConstants.RangeType.Ranged
                },
                new SpellRange
                {
                    Type = SpellConstants.RangeType.Touch
                },
                new SpellRange
                {
                    Type = SpellConstants.RangeType.Self
                }
            };
            ctx.SpellRanges.AddRange(ranges);

            return ranges;
        }

        private List<SpellDuration> CreateDandDDurations(ApplicationDbContext ctx)
        {
            List<SpellDuration> durations = new List<SpellDuration>
            {
                new SpellDuration
                {
                    Type = SpellConstants.DurationType.Duration,
                    Amount = 1,
                    Unit = "round"
                },
                new SpellDuration
                {
                    Type = SpellConstants.DurationType.Duration,
                    Amount = 1,
                    Unit = "minute"
                },
                new SpellDuration
                {
                    Type = SpellConstants.DurationType.Duration,
                    Amount = 1,
                    Unit = "minute",
                    Concentration = true
                },
                new SpellDuration
                {
                    Type = SpellConstants.DurationType.Duration,
                    Amount = 10,
                    Unit = "minutes",
                    Concentration = true
                },
                new SpellDuration
                {
                    Type = SpellConstants.DurationType.Duration,
                    Amount = 1,
                    Unit = "hour"
                },
                new SpellDuration
                {
                    Type = SpellConstants.DurationType.Duration,
                    Amount = 1,
                    Unit = "hour",
                    Concentration = true
                },
                new SpellDuration
                {
                    Type = SpellConstants.DurationType.Duration,
                    Amount = 8,
                    Unit = "hours"
                },
                new SpellDuration
                {
                    Type = SpellConstants.DurationType.Instantaneous
                },
                new SpellDuration
                {
                    Type = SpellConstants.DurationType.Until,
                    UntilDispelled = true
                },
                new SpellDuration
                {
                    Type = SpellConstants.DurationType.Until,
                    UntilTriggered = true
                },
                new SpellDuration
                {
                    Type = SpellConstants.DurationType.Until,
                    UntilTriggered = true,
                    UntilDispelled = true
                }
            };
            ctx.SpellDurations.AddRange(durations);

            return durations;
        }

        private List<SpellComponents> CreateDnDSpellComponents(ApplicationDbContext ctx)
        {
            var spellComponents = new List<SpellComponents>
            {
                new SpellComponents
                {
                    Verbal = true,
                    Somatic = true,
                },
                new SpellComponents
                {
                    Verbal = true
                }
            };
            ctx.SpellComponents.AddRange(spellComponents);

            return spellComponents;
        }

        #endregion

        SpellData CreateLevel9Spells(ApplicationDbContext ctx, SpellData spellData)
        {
            var spells = new List<Spell>
            {
                new Spell
                {
                    Campaign = _campaign,
                    CastingTime = _t1Hour,
                    Description = "<p>You and up to eight willing creatures within range project your astral bodies into the Astral Plane (the spell fails and the casting is wasted if you are already on that plane). The material body you leave behind is unconscious and in a state of suspended animation; it doesn’t need food or air and doesn’t age.</p><p>Your astral body resembles your mortal form in almost every way, replicating your game statistics and possessions. The principal difference is the addition of a silvery cord that extends from between your shoulder blades and trails behind you, fading to invisibility after 1 foot. This cord is your tether to your material body. As long as the tether remains intact, you can find your way home. If the cord is cut—something that can happen only when an effect specifically states that it does—your soul and body are separated, killing you instantly.</p><p>Your astral form can freely travel through the Astral Plane and can pass through portals there leading to any other plane. If you enter a new plane or return to the plane you were on when casting this spell, your body and possessions are transported along the silver cord, allowing you to re - enter your body as you enter the new plane.Your astral form is a separate incarnation.Any damage or other effects that apply to it have no effect on your physical body, nor do they persist when you return to it.</p><p>The spell ends for you and your companions when you use your action to dismiss it.When the spell ends, the affected creature returns to its physical body, and it awakens.</p><p>The spell might also end early for you or one of your companions.A successful dispel magic spell used against an astral or physical body ends the spell for that creature. If a creature’s original body or its astral form drops to 0 hit points, the spell ends for that creature. If the spell ends and the silver cord is intact, the cord pulls the creature’s astral form back to its body, ending its state of suspended animation.</p><p>If you are returned to your body prematurely, your companions remain in their astral forms and must find their own way back to their bodies, usually by dropping to 0 hit points.</p>",
                    Level = 9,
                    Name = "Astral Projection",
                    SpellDuration = new SpellDuration
                    {
                        Type = SpellConstants.DurationType.Special
                    },
                    SpellComponents = new SpellComponents
                    {
                        Material = "For each creature you affect with this spell, you must provide one jacinth worth at least 1,000 gp and one ornately carved bar of silver worth at least 100 gp, all of which the spell consumes",
                        Somatic = true,
                        Verbal = true
                    },
                    SpellRange = _r10f,
                    SpellSchool = _necromancy
                },
                new Spell
                {
                    Campaign = _campaign,
                    CastingTime = _t1Action,
                    Description = "<p>A churning storm cloud forms, centered on a point you can see and spreading to a radius of 360 feet. Lightning flashes in the area, thunder booms, and strong winds roar. Each creature under the cloud (no more than 5,000 feet beneath the cloud) when it appears must make a Constitution saving throw. On a failed save, a creature takes 2d6 thunder damage and becomes deafened for 5 minutes.</p><p>Each round you maintain concentration on this spell, the storm produces additional effects on your turn.</p><p>Round 2. Acidic rain falls from the cloud. Each creature and object under the cloud takes 1d6 acid damage.</p><p>Round 3. You call six bolts of lightning from the cloud to strike six creatures or objects of your choice beneath the cloud. A given creature or object can’t be struck by more than one bolt. A struck creature must make a Dexterity saving throw. The creature takes 10d6 lightning damage on a failed save, or half as much damage on a successful one.</p><p>Round 4. Hailstones rain down from the cloud. Each creature under the cloud takes 2d6 bludgeoning damage.</p><p>Round 5–10. Gusts and freezing rain assail the area under the cloud. The area becomes difficult terrain and is heavily obscured. Each creature there takes 1d6 cold damage. Ranged weapon attacks in the area are impossible. The wind and rain count as a severe distraction for the purposes of maintaining concentration on spells.Finally, gusts of strong wind(ranging from 20 to 50 miles per hour) automatically disperse fog, mists, and similar phenomena in the area, whether mundane or magical.</p>",
                    Level = 9,
                    Name = "Storm of Vengeance",
                    SpellComponents = _cVS,
                    SpellDuration = _d1cminute,
                    SpellRange = new SpellRange
                    {
                        Type = SpellConstants.RangeType.Sight
                    },
                    SpellSchool = _conjuration
                }
            };

            ctx.Spells.AddRange(spells);
            return spellData;
        }
        SpellData CreateLevel8Spells(ApplicationDbContext ctx, SpellData spellData)
        {
            var spells = new List<Spell>
            {
                new Spell
                {
                    Campaign = _campaign,
                    CastingTime = _t1Action,
                    Description = "<p>Brilliant sunlight flashes in a 60-foot radius centered on a point you choose within range. Each creature in that light must make a Constitution saving throw. On a failed save, a creature takes 12d6 radiant damage and is blinded for 1 minute. On a successful save, it takes half as much damage and isn’t blinded by this spell. Undead and oozes have disadvantage on this saving throw.</p><p>A creature blinded by this spell makes another Constitution saving throw at the end of each of its turns. On a successful save, it is no longer blinded.</p><p>This spell dispels any darkness in its area that was created by a spell.</p>",
                    Level = 8,
                    Name = "Sunburst",
                    SpellComponents = new SpellComponents
                    {
                        Material = $"Fire{SpellConstants.EncodedComma}A piece of sunstone",
                        Somatic = true,
                        Verbal = true
                    },
                    SpellDuration = _dinst,
                    SpellRange = _r150f,
                    SpellSchool = _evocation
                }
            };

            ctx.Spells.AddRange(spells);
            return spellData;
        }
        SpellData CreateLevel7Spells(ApplicationDbContext ctx, SpellData spellData)
        {
            var spells = new List<Spell>
            {
                new Spell
                {
                    Campaign = _campaign,
                    CastingTime = new CastingTime
                    {
                        Amount = 12,
                        Unit = "hours",
                        Type = SpellConstants.CastingTimeType.Time
                    },
                    Description = "<p>You shape an illusory duplicate of one beast or humanoid that is within range for the entire casting time of the spell. The duplicate is a creature, partially real and formed from ice or snow, and it can take actions and otherwise be affected as a normal creature. It appears to be the same as the original, but it has half the creature’s hit point maximum and is formed without any equipment. Otherwise, the illusion uses all the statistics of the creature it duplicates.</p><p>The simulacrum is friendly to you and creatures you designate. It obeys your spoken commands, moving and acting in accordance with your wishes and acting on your turn in combat. The simulacrum lacks the ability to learn or become more powerful, so it never increases its level or other abilities, nor can it regain expended spell slots.</p><p>If the simulacrum is damaged, you can repair it in an alchemical laboratory, using rare herbs and minerals worth 100 gp per hit point it regains. The simulacrum lasts until it drops to 0 hit points, at which point it reverts to snow and melts instantly.</p><p>If you cast this spell again, any currently active duplicates you created with this spell are instantly destroyed.</p>",
                    Level = 7,
                    Name = "Simulacrum",
                    SpellComponents = new SpellComponents
                    {
                        Material = $"Snow or ice in quantities sufficient to made a life-size copy of the duplicated creature{SpellConstants.EncodedComma}Some hair, fingernail clippings, or other piece of that creature’s body placed inside the snow or ice{SpellConstants.EncodedComma}Powdered ruby worth 1,500 gp, sprinkled over the duplicate and consumed by the spell",
                        Somatic = true,
                        Verbal = true
                    },
                    SpellDuration = _dUD,
                    SpellRange = _rtouch,
                    SpellSchool = _illusion
                }
            };

            ctx.AddRange(spells);
            return spellData;
        }
        SpellData CreateLevel6Spells(ApplicationDbContext ctx, SpellData spellData)
        {
            var chainLightning = new Spell
            {
                Campaign = _campaign,
                AtHigherLevels = "<p>When you cast this spell using a spell slot of 7th level or higher, one additional bolt leaps from the first target to another target for each slot above 6th.</p>",
                CastingTime = _t1Action,
                Description = "<p>You create a bolt of lightning that arcs towards a target of your choice that you can see within range. Three bolts then leap from that target to as many as three other targets, each of which must be within 30 feet of the first target. A target can be a creature or an object and can be targeted by only one of the bolts.</p><p>A target must make a dexterity saving throw. The target takes 10d8 lightning damage on a failed save, or half as much damage on a successful one.</p>",
                Level = 6,
                Name = "Chain Lightning",
                SpellRange = _r150f,
                SpellComponents = new SpellComponents
                {
                    Material = $"A bit of fur{SpellConstants.EncodedComma}A piece of amber or a crystal rod{SpellConstants.EncodedComma}Three silver pins",
                    Somatic = true,
                    Verbal = true
                },
                SpellDuration = _dinst,
                SpellSchool = _evocation,
            };

            var spells = new List<Spell>
            {
                chainLightning
            };

            spellData.ChainLightning = chainLightning;

            ctx.AddRange(spells);
            return spellData;
        }
        SpellData CreateLevel5Spells(ApplicationDbContext ctx, SpellData spellData)
        {
            Spell
                cloudKill = new Spell
                {
                    Campaign = _campaign,
                    AtHigherLevels = "<p>When you cast this spell using a spell slot of 6th level or higher, the damage increases by 1d8 for each slot level above 5th.</p>",
                    CastingTime = _t1Action,
                    Description = "<p>You create a 20-foot-radius Sphere of poisonous, yellow-green fog centered on a point you choose within range. The fog spreads around corners. It lasts for the Duration or until strong wind disperses the fog, ending the spell. Its area is heavily obscured.</p><p>When a creature enters the spell’s area for the first time on a turn or starts its turn there, that creature must make a Constitution saving throw. The creature takes 5d8 poison damage on a failed save, or half as much damage on a successful one. Creatures are affected even if they hold their breath or don’t need to breathe.</p><p>The fog moves 10 feet away from you at the start of each of your turns, rolling along the surface of the ground. The vapors, being heavier than air, sink to the lowest level of the land, even pouring down openings.</p>",
                    Level = 5,
                    Name = "Cloudkill",
                    SpellRange = _r120f,
                    SpellComponents = _cVS,
                    SpellDuration = _d10cminutes,
                    SpellSchool = _conjuration
                },
                seeming = new Spell
                {
                    Campaign = _campaign,
                    CastingTime = _t1Action,
                    Description = "<p>This spell allows you to change the appearance of any number of creatures that you can see within range. You give each target you choose a new, illusory appearance. An unwilling target can make a Charisma saving throw, and if it succeeds, it is unaffected by this spell.</p><p>The spell disguises physical appearance as well as clothing, armor, weapons, and equipment. You can make each creature seem 1 foot shorter or taller and appear thin, fat, or in between. You can’t change a target’s body type, so you must choose a form that has the same basic arrangement of limbs. Otherwise, the extent of the illusion is up to you. The spell lasts for the duration, unless you use your action to dismiss it sooner.</p><p>The changes wrought by this spell fail to hold up to physical inspection. For example, if you use this spell to add a hat to a creature’s outfit, objects pass through the hat, and anyone who touches it would feel nothing or would feel the creature’s head and hair. If you use this spell to appear thinner than you are, the hand of someone who reaches out to touch you would bump into you while it was seemingly still in midair.</p><p>A creature can use its action to inspect a target and make an Intelligence (Investigation) check against your spell save DC. If it succeeds, it becomes aware that the target is disguised.</p>",
                    Level = 5,
                    Name = "Seeming",
                    SpellRange = _r30f,
                    SpellComponents = _cVS,
                    SpellDuration = _d8hours,
                    SpellSchool = _illusion
                };
            var spells = new List<Spell>
            {
                cloudKill,
                seeming
            };

            spellData.Cloudkill = cloudKill;
            spellData.Seeming = seeming;

            ctx.AddRange(spells);
            return spellData;
        }
        SpellData CreateLevel4Spells(ApplicationDbContext ctx, SpellData spellData)
        {
            Spell
                iceStorm = new Spell
                {
                    Campaign = _campaign,
                    AtHigherLevels = "<p>When you cast this spell using a spell slot of 5th level or higher, the bludgeoning damage increases by 1d8 for each slot level above 4th.</p>",
                    CastingTime = _t1Action,
                    Description = "<p>A hail of rock-hard ice pounds to the ground in a 20-foot-radius, 40-foot-high cylinder centered on a point within range. Each creature in the cylinder must make a Dexterity saving throw. A creature takes 2d8 bludgeoning damage and 4d6 cold damage on a failed save, or half as much damage on a successful one. Hailstones turn the storm’s area of effect into difficult terrain until the end of your next turn.</p>",
                    Level = 4,
                    Name = "Ice Storm",
                    SpellRange = new SpellRange
                    {
                        Amount = 300,
                        Unit = "feet",
                        Type = SpellConstants.RangeType.Ranged
                    },
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true,
                        Material = $"A pinch of dust{SpellConstants.EncodedComma}A few drops of water",
                    },
                    SpellDuration = _dinst,
                    SpellSchool = _evocation
                },
                stormSphere = new Spell
                {
                    Campaign = _campaign,
                    AtHigherLevels = "<p>When you cast this spell using a spell slot of 5th level or higher, the damage increases for each of its effects by ld6 for each slot level above 4th.</p>",
                    CastingTime = _t1Action,
                    Description = "<p>A 20-foot-radius sphere of whirling air springs into existence centered on a point you choose within range. The sphere remains for the spell's duration. Each creature in the sphere when it appears or that ends its turn there must succeed on a Strength saving throw or take 2d6 bludgeoning damage.The sphere's space is difficult terrain.</p><p>Until the spell ends, you can use a bonus action on each of your turns to cause a bolt of lightning to leap from the center of the sphere toward one creature you choose within 60 feet ofthe center. Make a ranged spell attack. You have advantage on the attack roll if the target is in the sphere. On a hit, the target takes 4d6 lightning damage. </p><p> Creatures within 30 feet of the sphere have disadvantage on Wisdom(Perception) checks made to listen.</p>",
                    Level = 4,
                    Name = "Storm Sphere",
                    SpellRange = _r150f,
                    SpellComponents = _cVS,
                    SpellDuration = _d1cminute,
                    SpellSchool = _evocation
                };

            var spells = new List<Spell>
            {
                iceStorm,
                stormSphere
            };

            spellData.IceStorm = iceStorm;
            spellData.StormSphere = stormSphere;

            ctx.AddRange(spells);
            return spellData;
        }
        SpellData CreateLevel3Spells(ApplicationDbContext ctx, SpellData spellData)
        {
            Spell
                fly = new Spell
                {
                    Campaign = _campaign,
                    AtHigherLevels = "<p>When you cast this spell using a spell slot of 4th level or higher, you can target one additional creature for each slot level above 3rd.</p>",
                    CastingTime = _t1Action,
                    Description = "<p>You touch a willing creature. The target gains a flying speed of 60 feet for the duration. When the spell ends, the target falls if it is still aloft, unless it can stop the fall.</p>",
                    Level = 3,
                    Name = "Fly",
                    SpellRange = _rtouch,
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true,
                        Material = "A wing feather from any bird"
                    },
                    SpellDuration = _d10cminutes,
                    SpellSchool = _transmutation
                },
                gasouesForm = new Spell
                {
                    Campaign = _campaign,
                    CastingTime = _t1Action,
                    Description = "<p>You transform a willing creature you touch, along with everything it’s wearing and carrying, into a misty cloud for the duration. The spell ends if the creature drops to 0 hit points. An incorporeal creature isn’t affected.</p><p>While in this form, the target’s only method of movement is a flying speed of 10 feet. The target can enter and occupy the space of another creature. The target has resistance to nonmagical damage, and it has advantage on Strength, Dexterity, and Constitution saving throws. The target can pass through small holes, narrow openings, and even mere cracks, though it treats liquids as though they were solid surfaces. The target can’t fall and remains hovering in the air even when stunned or otherwise incapacitated.</p><p>While in the form of a misty cloud, the target can’t talk or manipulate objects, and any objects it was carrying or holding can’t be dropped, used, or otherwise interacted with. The target can’t attack or cast spells.</p>",
                    Level = 3,
                    Name = "Gaseous Form",
                    SpellRange = _rtouch,
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true,
                        Material = $"A bit of gauze{SpellConstants.EncodedComma}A wisp of smoke",
                    },
                    SpellDuration = _d1chour,
                    SpellSchool = _transmutation
                },
                haste = new Spell
                { 
                    Campaign = _campaign,
                    CastingTime = _t1Action,
                    Description = "<p>Choose a willing creature that you can see within range. Until the spell ends, the target's speed is doubled, it gains a + 2 bonus to AC, it has advantage on Dexterity saving throws, and it gains an additional action on each of its turns. That action can be used only to take the Attack(one weapon attack only), Dash, Disengage, Hide, or Use an Object action.</p><p>When the spell ends, the target can't move or take actions until after its next turn, as a wave of lethargy sweeps over it.</p>",
                    Level = 3,
                    Name = "Haste",
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true,
                        Material = "a shaving of licorice root"
                    },
                    SpellDuration = _d1cminute,
                    SpellRange = _r30f,
                    SpellSchool = _transmutation
                },
                lightningBolt = new Spell
                {
                    Campaign = _campaign,
                    AtHigherLevels = "<p>When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot above 3rd.</p>",
                    CastingTime = _t1Action,
                    Description = "<p>A stroke of lightning forming a line 100 feet long and 5 feet wide blasts out from you in a direction you choose. Each creature in the line must make a Dexterity saving throw. A creature takes 8d6 lightning damage on a failed save, or half as much damage on a successful one. The lightning ignites flammable objects in the area that aren’t being worn or carried.</p>",
                    Level = 3,
                    Name = "Lightning Bolt",
                    SpellRange = new SpellRange
                    {
                        Amount = 100,
                        Type = SpellConstants.RangeType.Self,
                        Shape = "line",
                        Unit = "feet"
                    },
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true,
                        Material = $"A bit of fur{SpellConstants.EncodedComma}A rod of amber, crystal, or glass",
                    },
                    SpellDuration = _dinst,
                    SpellSchool = _evocation
                };
            var spells = new List<Spell>
            {
                fly,
                gasouesForm,
                lightningBolt,
                new Spell
                {
                    AtHigherLevels = "<p>When you cast this spell using a spell slot of 4th level or higher, the damage of an explosive runes glyph increases by 1d8 for each slot level above 3rd. If you create a spell glyph, you can store any spell of up to the same level as the slot you use for the glyph of warding.</p>",
                    CastingTime = _t1Hour,
                    Campaign = _campaign,
                    Description = "<p>When you cast this spell, you inscribe a glyph that harms other creatures, either upon a surface (such as a table or a section of floor or wall) or within an object that can be closed (such as a book, a scroll, or a treasure chest) to conceal the glyph. If you choose a surface, the glyph can cover an area of the surface no larger than 10 feet in diameter. If you choose an object, that object must remain in its place; if the object is moved more than 10 feet from where you cast this spell, the glyph is broken, and the spell ends without being triggered. The glyph is nearly invisible and requires a successful Intelligence (Investigation) check against your spell save DC to be found. You decide what triggers the glyph when you cast the spell. For glyphs inscribed on a surface, the most typical triggers include touching or standing on the glyph, removing another object covering the glyph, approaching within a certain distance of the glyph, or manipulating the object on which the glyph is inscribed. For glyphs inscribed within an object, the most common triggers include opening that object, approaching within a certain distance of the object, or seeing or reading the glyph. Once a glyph is triggered, this spell ends. You can further refine the trigger so the spell activates only under certain circumstances or according to physical characteristics (such as height or weight), creature kind (for example, the ward could be set to affect aberrations or drow), or alignment. You can also set conditions for creatures that don’t trigger the glyph, such as those who say a certain password. When you inscribe the glyph, choose explosive runes or a spell glyph. Explosive Runes. When triggered, the glyph erupts with magical energy in a 20-foot-radius sphere centered on the glyph. The sphere spreads around corners. Each creature in the area must make a Dexterity saving throw. A creature takes 5d8 acid, cold, fire, lightning, or thunder damage on a failed saving throw (your choice when you create the glyph), or half as much damage on a successful one. Spell Glyph. You can store a prepared spell of 3rd level or lower in the glyph by casting it as part of creating the glyph. The spell must target a single creature or an area. The spell being stored has no immediate effect when cast in this way. When the glyph is triggered, the stored spell is cast. If the spell has a target, it targets the creature that triggered the glyph. If the spell affects an area, the area is centered on that creature. If the spell summons hostile creatures or creates harmful objects or traps, they appear as close as possible to the intruder and attack it. If the spell requires concentration, it lasts until the end of its full duration.</p>",
                    Level = 3,
                    Name = "Glyph of Warding",
                    SpellComponents = new SpellComponents
                    {
                        Material = "Incense and powdered diamond worth at least 200 gp, which the spell consumes",
                        Somatic = true,
                        Verbal = true
                    },
                    SpellDuration = _dUTD,
                    SpellRange = _rtouch,
                    SpellSchool = _abjuration,
                },
                new Spell
                {
                    Campaign = _campaign,
                    CastingTime = _t1Action,
                    Description = "<p>You send a short message of twenty-five words or less to a creature with which you are familiar. The creature hears the message in its mind, recognizes you as the sender if it knows you, and can answer in a like manner immediately. The spell enables creatures with Intelligence scores of at least 1 to understand the meaning of your message.</p><p>You can send the message across any distance and even to other planes of existence, but if the target is on a different plane than you, there is a 5 percent chance that the message doesn’t arrive.</p>",
                    Level = 3,
                    Name = "Sending",
                    SpellComponents = new SpellComponents
                    {
                        Material = "A short piece of fine copper wire",
                        Somatic = true,
                        Verbal = true
                    },
                    SpellDuration = _d1round,
                    SpellRange = new SpellRange
                    {
                        Type = SpellConstants.RangeType.Unlimited,
                    },
                    SpellSchool = _evocation
                }
            };

            spellData.Fly = fly;
            spellData.GaseousForm = gasouesForm;
            spellData.Haste = haste;
            spellData.LightningBolt = lightningBolt;

            ctx.AddRange(spells);
            return spellData;
        }
        SpellData CreateLevel2Spells(ApplicationDbContext ctx, SpellData spellData)
        {
            Spell
                dustDevil = new Spell
                {
                    Campaign = _campaign,
                    AtHigherLevels = "<p>When you cast this spell using a spell slot of 3rd level or higher, the damage increases by ld8 for each slot level above 2nd.</p>",
                    CastingTime = _t1Action,
                    Description = "<p>Choose an unoccupied 5-foot cube of air that you can see within range. An elemental force that resembles a dust devil appears in the cube and lasts for the spell's duration.</p><p>Any creature that ends its turn within 5 feet of the dust devil must make a Strength saving throw. On a failed save, the creature takes ld8 bludgeoning damage and is pushed 10 feet away. On a successful save, the creature takes half as much damage and isn't pushed. </p><p>As a bonus action, you can move the dust devil up to 30 feet in any direction. If the dust devil moves over sand, dust, loose dirt, or small gravel, it sucks up the material and forms a 10-foot-radius cloud of debris around itself that lasts until the start of your next turn. The cloud heavily obscures its area.</p>",
                    Level = 2,
                    Name = "Dust Devil",
                    SpellRange = _r60f,
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true,
                        Material = "A pinch of dust"
                    },
                    SpellDuration = _d1cminute,
                    SpellSchool = _conjuration
                },
                gustOfWind = new Spell
                {
                    Campaign = _campaign,
                    CastingTime = _t1Action,
                    Description = "<p>A line of strong wind 60 feet long and 10 feet wide blasts from you in a direction you choose for the spell's Duration. Each creature that starts its turn in the line must succeed on a Strength saving throw or be pushed 15 feet away from you in a direction following the line.</p><p>Any creature in the line must spend 2 feet of Movement for every 1 foot it moves when moving closer to you.</p><p>The gust disperses gas or vapor, and it extinguishes candles, torches, and similar unprotected flames in the area. It causes protected flames, such as those of lanterns, to dance wildly and has a 50 percent chance to extinguish them.</p><p>As a Bonus Action on each of your turns before the spell ends, you can change the direction in which the line blasts from you.</p>",
                    Level = 2,
                    Name = "Gust of Wind",
                    SpellRange = new SpellRange
                    {
                        Amount = 60,
                        Unit = "feet",
                        Shape = "line",
                        Type = SpellConstants.RangeType.Self,
                    },
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true,
                        Material = "A legume seed"
                    },
                    SpellDuration = _d1cminute,
                    SpellSchool = _evocation
                },
                invisibility = new Spell
                {
                    Campaign = _campaign,
                    AtHigherLevels = "<p>When you cast this spell using a spell slot of 3rd level or higher, you can target one additional creature for each slot level above 2nd.</p>",
                    CastingTime = _t1Action,
                    Description = "<p>A creature you touch becomes invisible until the spell ends. Anything the target is wearing or carrying is invisible as long as it is on the target’s person. The spell ends for a target that attacks or casts a spell.</p>",
                    Level = 2,
                    Name = "Invisibility",
                    SpellRange = _rtouch,
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true,
                        Material = "An eyelash encased in gum arabic"
                    },
                    SpellDuration = _d1chour,
                    SpellSchool = _illusion
                },
                levitate = new Spell
                {
                    Campaign = _campaign,
                    CastingTime = _t1Action,
                    Description = "<p>One creature or object of your choice that you can see within range rises vertically, up to 20 feet, and remains suspended there for the duration. The spell can levitate a target that weighs up to 500 pounds. An unwilling creature that succeeds on a Constitution saving throw is unaffected.</p><p>The target can move only by pushing or pulling against a fixed objeet or surface within reach (such as a wall or a ceiling), which allows it to move as if it were climbing. You can change the target's altitude by up to 20 feet in either dircetion on your turn. If you are the target, you can move up or down as part of your move. Otherwise, you can use your action to move the target, which must remain within the spell's range.</p><p>When the spell ends, the target floats gently to the ground if it is still aloft.</p>",
                    Level = 2,
                    Name = "Levitate",
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true,
                        Material = "either a small leather loop or a piece of golden wire bent into a cup shape with a long shank on one end"
                    },
                    SpellDuration = _d10cminutes,
                    SpellRange = _r60f,
                    SpellSchool = _transmutation
                },
                mistyStep = new Spell
                {
                    Campaign = _campaign,
                    CastingTime = _t1Bonus,
                    Description = "<p>Briefly surrounded by silvery mist, you teleport up to 30 feet to an unoccupied space that you can see.</p>",
                    Level = 2,
                    Name = "Misty Step",
                    SpellComponents = _cV,
                    SpellDuration = _dinst,
                    SpellRange = _rself,
                    SpellSchool = _conjuration
                };

            var spells = new List<Spell>
            {
                dustDevil,
                gustOfWind,
                invisibility,
                levitate,
                mistyStep
            };

            spellData.DustDevil = dustDevil;
            spellData.GustOfWind = gustOfWind;
            spellData.Invisibility = invisibility;
            spellData.Levitate = levitate;
            spellData.MistyStep = mistyStep;

            ctx.AddRange(spells);
            return spellData;
        }
        SpellData CreateLevel1Spells(ApplicationDbContext ctx, SpellData spellData)
        {
            Spell
                charmPerson = new Spell
                {
                    Campaign = _campaign,
                    AtHigherLevels = "<p>When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st. The creatures must be within 30 feet of each other when you target them.</p>",
                    CastingTime = _t1Action,
                    Description = "<p>You attempt to charm a humanoid you can see within range. It must make a Wisdom saving throw, and does so with advantage if you or your companions are fighting it. If it fails the saving throw, it is Charmed by you until the spell ends or until you or your companions do anything harmful to it. The Charmed creature regards you as a friendly acquaintance. When the spell ends, the creature knows it was Charmed by you.</p>",
                    Level = 1,
                    Name = "Charm Person",
                    SpellRange = _r30f,
                    SpellComponents = _cVS,
                    SpellDuration = _d1hour,
                    SpellSchool = _enchantment
                },
                expeditiousRetreat = new Spell
                {
                    Campaign = _campaign,
                    CastingTime = _t1Bonus,
                    Description = "<p>This spell allows you to move at an incredible pace. When you cast this spell, and then as a bonus action on each of your turns unlil the spell ends, you can take the Dash action.</p>",
                    Level = 1,
                    Name = "Expeditious Retreat",
                    SpellComponents = _cVS,
                    SpellDuration = _d10cminutes,
                    SpellRange = _rself,
                    SpellSchool = _transmutation
                },
                featherFall = new Spell
                {
                    Campaign = _campaign,
                    CastingTime = new CastingTime
                    {
                        Type = SpellConstants.CastingTimeType.Reaction,
                        ReactionCondition = "which you take when you or a creature within 60 feet of you falls"
                    },
                    Description = "<p>Choose up to five Falling creatures within range. A Falling creature's rate of descent slows to 60 feet per round until the spell ends. If the creature lands before the spell ends, it takes no Falling damage and can land on its feet, and the spell ends for that creature.</p>",
                    Level = 1,
                    Name = "Feather Fall",
                    SpellRange = _r60f,
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Material = "A small feather or piece of down"
                    },
                    SpellDuration = _d1minute,
                    SpellSchool = _transmutation
                },
                jump = new Spell
                {
                    Campaign = _campaign,
                    CastingTime = _t1Action,
                    Description = "You touch a creature. The creature's jump distance is tripled until the spell ends.",
                    Level = 1,
                    Name = "Jump",
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true,
                        Material = "A grasshopper's hind leg"
                    },
                    SpellDuration = _d1minute,
                    SpellRange = _rtouch,
                    SpellSchool = _transmutation
                },
                mageArmor = new Spell
                {
                    Campaign = _campaign,
                    CastingTime = _t1Action,
                    Description = "<p>You touch a willing creature who isn't wearing armor, and a protective magical force surrounds it until the spell ends. The target's base AC becomes 13 + its Dexterity modifier. The spell ends it if the target dons armor or if you dismiss the spell as an action.</p>",
                    Level = 1,
                    Name = "Mage Armor",
                    SpellRange = _rtouch,
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true,
                        Material = "A piece of cured leather"
                    },
                    SpellDuration = _d8hours,
                    SpellSchool = _abjuration
                },
                thunderwave = new Spell
                {
                    Campaign = _campaign,
                    AtHigherLevels = "<p>When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st.</p>",
                    CastingTime = _t1Action,
                    Description = "<p>A wave of thunderous force sweeps out from you. Each creature in a 15-foot cube originating from you must make a Constitution saving throw. On a failed save, a creature takes 2d8 thunder damage and is pushed 10 feet away from you. On a successful save, the creature takes half as much damage and isn't pushed.</p><p>In addition, unsecured Objects that are completely within the area of effect are automatically pushed 10 feet away from you by the spell's effect, and the spell emits a thunderous boom audible out to 300 feet.</p>",
                    Level = 1,
                    Name = "Thunderwave",
                    SpellRange = new SpellRange
                    {
                        Type = SpellConstants.RangeType.Self,
                        Amount = 15,
                        Unit = "feet",
                        Shape = "cube"
                    },
                    SpellComponents = _cVS,
                    SpellDuration = _dinst,
                    SpellSchool = _evocation
                };

            var spells = new List<Spell>
            {
                new Spell
                {
                    Campaign = _campaign,
                    CastingTime = _t1Action,
                    Description = "<p>For the Duration, you sense the presence of magic within 30 feet of you. If you sense magic in this way, you can use your action to see a faint aura around any visible creature or object in the area that bears magic, and you learn its school of magic, if any.</p><p>The spell can penetrate most barriers, but is blocked by 1 foot of stone, 1 inch of Common metal, a thin sheet of lead, or 3 feet of wood or dirt.</p>",
                    Level = 1,
                    Name = "Detect Magic",
                    Ritual = true,
                    SpellComponents = _cVS,
                    SpellDuration = _d10cminutes,
                    SpellRange = new SpellRange
                    {
                        Amount = 30,
                        Type = SpellConstants.RangeType.Self,
                        Shape = "sphere",
                        Unit = "feet"
                    },
                    SpellSchool = _divination,
                }
            };

            spellData.CharmPerson = charmPerson;
            spellData.ExpeditiousRetreat = expeditiousRetreat;
            spellData.FeatherFall = featherFall;
            spellData.Jump = jump;
            spellData.MageArmor = mageArmor;
            spellData.Thunderwave = thunderwave;

            ctx.AddRange(spells);
            return spellData;
        }
        SpellData CreateCantrips(ApplicationDbContext ctx, SpellData spellData)
        {
            Spell
                friends = new Spell
                {
                    Campaign = _campaign,
                    CastingTime = _t1Action,
                    Description = "<p>For the duration, you have advantage on all Charisma checks directed at one creature of your choice that isn't hostile toward you. When the spell ends, the creature realizes that you used magic to influence its mood and becomes hostile toward you. A creature prone to violence might attack you. Another creature might seek retribution in other ways (at the DM's discretion), depending on the nature of your interaction with it.</p>",
                    Level = 0,
                    Name = "Friends",
                    SpellRange = _rself,
                    SpellComponents = new SpellComponents
                    {
                        Somatic = true,
                        Material = "A small amount of makeup appled to the face as this spell is cast"
                    },
                    SpellDuration = _d1cminute,
                    SpellSchool = _enchantment
                },
                gust = new Spell
                {
                    Campaign = _campaign,
                    CastingTime = _t1Action,
                    Description = "<p>You seize the air and compel it to create one of the following effects at a point you can see within range:</p><ul><li>One Medium or smaller creature that you choose must succeed on a Strength saving throw or be pushed up to 5 feet away from you.</li><li>You create a small blast of air capable of moving one object that is neither held nor carried and that weighs no more than 5 pounds. The object is pushed up to 10 feet away from you. It isn't pushed with enough force to cause damage. </li><li>You create a harmless sensory affect using air, such as causing leaves to rustle, wind to slam shutters shut, or your clothing to ripple in a breeze.</li></ul>",
                    Level = 0,
                    Name = "Gust",
                    SpellRange = _r30f,
                    SpellComponents = _cVS,
                    SpellDuration = _dinst,
                    SpellSchool = _transmutation
                },
                light = new Spell
                {
                    Campaign = _campaign,
                    CastingTime = _t1Action,
                    Description = "<p>You touch one objeet that is no larger than lO feet in any dimension. Until the spell ends, the object sheds bright light in a 20-foot radius and dim light for an additional 20 feet. The light can be colored as you like. Completely covering the object with something opaque blocks the light. The spell ends if you cast it again or dismiss it as an action.</p><p>If you target an object held or worn by a hostile creature, that creature must succeed on a Dexterity saving throw to avoid the spell.</p>",
                    Level = 0,
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Material = "a firefly or phosphorescent moss"
                    },
                    SpellDuration = _d1hour,
                    SpellRange = _rtouch,
                    SpellSchool = _evocation
                },
                mageHand = new Spell
                {
                    Campaign = _campaign,
                    CastingTime = _t1Action,
                    Description = "<p>A spectral, floating hand appears at a point you choose within range. The hand lasts for the Duration or until you dismiss it as an action. The hand vanishes if it is ever more than 30 feet away from you or if you cast this spell again.</p><p>You can use your action to control the hand. You can use the hand to manipulate an object, open an unlocked door or container, stow or retrieve an item from an open container, or pour the contents out of a vial. You can move the hand up to 30 feet each time you use it.</p><p>The hand can't Attack, activate magical items, or carry more than 10 pounds.</p>",
                    Level = 0,
                    Name = "Mage Hand",
                    SpellRange = _r30f,
                    SpellComponents = _cVS,
                    SpellDuration = _d1minute,
                    SpellSchool = _conjuration
                },
                message = new Spell
                {
                    Campaign = _campaign,
                    CastingTime = _t1Action,
                    Description = "<p>You point your finger toward a creature within range and whisper a message. The target (and only the target) hears the message and can reply in a whisper that only you can hear.</p><p>You can cast this spell through solid objects if you are familiar with the target and know it is beyond the barrier. Magical silence, 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood blocks the spell. The spell doesn’t have to follow a straight line and can travel freely around corners or through openings.</p>",
                    Level = 0,
                    Name = "Message",
                    SpellRange = _r120f,
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true,
                        Material = "A short piece of copper wire"
                    },
                    SpellDuration = _d1round,
                    SpellSchool = _transmutation
                },
                prest = new Spell
                {
                    Campaign = _campaign,
                    CastingTime = _t1Action,
                    Description = "<p>This spell is a minor magical trick that novice spellcasters use for practice. You create one of the following magical Effects within range.</p><ul><li>You create an Instantaneous, harmless sensory effect, such as a shower of sparks, a puff of wind, faint musical notes, or an odd odor.</li><li>You instantaneously light or snuff out a Candle, a torch, or a small campfire.</li><li>You instantaneously clean or soil an object no larger than 1 cubic foot.</li><li>You chill, warm, or flavor up to 1 cubic foot of nonliving material for 1 hour.</li><li>You make a color, a small mark, or a Symbol appear on an object or a surface for 1 hour.</li><li>You create a nonmagical trinket or an illusory image that can fit in your hand and that lasts until the end of your next turn.</li></ul><p>If you cast this spell multiple times, you can have up to three of its non-instantaneous Effects active at a time, and you can dismiss such an effect as an action.</p>",
                    Level = 0,
                    Name = "Prestidigitation",
                    SpellRange = _r10f,
                    SpellComponents = _cVS,
                    SpellDuration = new SpellDuration
                    {
                        UpTo = true,
                        Amount = 1,
                        Unit = "hour"
                    },
                    SpellSchool = _transmutation
                },
                rayOfFrost = new Spell
                {
                    Campaign = _campaign,
                    AtHigherLevels = "<p>The spell's damage increases by 1d8 when you reach 5th level, and for every 6 levels beyond</p>",
                    CastingTime = _t1Action,
                    Description = "<p>A frigid beam of blue-white light streaks toward a creature within range. Make a ranged spell Attack against the target. On a hit, it takes 1d8 cold damage, and its speed is reduced by 10 feet until the start of your next turn.</p>",
                    Level = 0,
                    Name = "Ray of Frost",
                    SpellRange = _r60f,
                    SpellComponents = _cVS,
                    SpellDuration = _dinst,
                    SpellSchool = _evocation
                },
                shockingGrasp = new Spell
                {
                    Campaign = _campaign,
                    AtHigherLevels = "<p>The spell's damage increases by 1d8 when you reach 5th level, and for every 6 levels beyond</p>",
                    CastingTime = _t1Action,
                    Description = "<p>Lightning springs from your hand to deliver a shock to a creature you try to touch. Make a melee spell attack against the target. You have advantage on the attack roll if the target is wearing armor made of metal. On a hit, the target takes 1d8 lightning damage, and it can’t take reactions until the start of its next turn.</p>",
                    Level = 0,
                    Name = "Shocking Grasp",
                    SpellRange = _rtouch,
                    SpellComponents = _cVS,
                    SpellDuration = _dinst,
                    SpellSchool = _evocation
                };

            var spells = new List<Spell>
            {
                friends,
                gust,
                light,
                mageHand,
                message,
                prest,
                rayOfFrost,
                shockingGrasp
            };

            spellData.Friends = friends;
            spellData.Gust = gust;
            spellData.Light = light;
            spellData.MageHand = mageHand;
            spellData.Message = message;
            spellData.Prestidigitation = prest;
            spellData.RayOfFrost = rayOfFrost;
            spellData.ShockingGrasp = shockingGrasp;

            ctx.AddRange(spells);
            return spellData;
        }
    }
}
