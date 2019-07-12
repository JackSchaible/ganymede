using Ganymede.Api.Data.Spells;
using System.Collections.Generic;
using System.Linq;

namespace Ganymede.Api.Data.Initializers
{
    internal class SpellsInitializer
    {
        public void Initialize(ApplicationDbContext ctx, IEnumerable<SpellSchool> dAndDSchools, IEnumerable<SpellSchool> pfSchools, Campaign pota, out IEnumerable<Spell> dAndDSpells, out IEnumerable<Spell> pfSpells)
        {
            pfSpells = null;

            if (ctx.Spells.Any())
                dAndDSpells = ctx.Spells;
            else
            {
                dAndDSpells = CreateDandDSpells(ctx, dAndDSchools, pota.ID);
                ctx.Spells.AddRange(dAndDSpells);
            }
        }

        #region D&D

        private List<Spell> CreateDandDSpells(ApplicationDbContext ctx, IEnumerable<SpellSchool> schools, int campaignID)
        {
            #region Spell Data
            int
                abjuration = schools.Single(s => s.Name == "Abjuration").ID,
                conjuration = schools.Single(s => s.Name == "Conjuration").ID,
                enchantment = schools.Single(s => s.Name == "Enchantment").ID,
                evocation = schools.Single(s => s.Name == "Evocation").ID,
                illusion = schools.Single(s => s.Name == "Illusion").ID,
                transmutation = schools.Single(s => s.Name == "Transmutation").ID;

            var times = CreateDandDCastingTimes(ctx);
            int t1Action = times[0].ID;

            var ranges = CreateDandDRanges(ctx);
            int
                r30f = ranges[0].ID,
                r60f = ranges[1].ID,
                r120f = ranges[2].ID,
                r150f = ranges[3].ID,
                rtouch = ranges[4].ID;

            var durations = CreateDandDDurations(ctx);
            int
                d1round = durations[0].ID,
                d1minute = durations[1].ID,
                d1cminute = durations[2].ID,
                d10cminutes = durations[3].ID,
                d1hour = durations[4].ID,
                d1chour = durations[5].ID,
                d8hours = durations[6].ID,
                dinst = durations[7].ID;

            #endregion

            return new List<Spell>
            {
                #region Level 6

                new Spell
                {
                    CampaignID = campaignID,
                    AtHigherLevels = "<p>When you cast this spell using a spell slot of 7th level or higher, one additional bolt leaps from the first target to another target for each slot above 6th.</p>",
                    CastingTimeID = t1Action,
                    Description = "<p>You create a bolt of lightning that arcs towards a target of your choice that you can see within range. Three bolts then leap from that target to as many as three other targets, each of which must be within 30 feet of the first target. A target can be a creature or an object and can be targeted by only one of the bolts.</p><p>A target must make a dexterity saving throw. The target takes 10d8 lightning damage on a failed save, or half as much damage on a successful one.</p>",
                    Level = 6,
                    Name = "Chain Lightning",
                    SpellRangeID = r150f,
                    SpellComponents = new SpellComponents
                    {
                        Material = new string[]
                        {
                            "A bit of fur",
                            "A piece of amber or a crystal rod",
                            "Three silver pins"
                        },
                        Somatic = true,
                        Verbal = true
                    },
                    SpellDurationID = dinst,
                    SpellSchoolID = evocation,
                },

                #endregion

                #region Level 5

                new Spell
                {
                    CampaignID = campaignID,
                    AtHigherLevels = "<p>When you cast this spell using a spell slot of 6th level or higher, the damage increases by 1d8 for each slot level above 5th.</p>",
                    CastingTimeID = t1Action,
                    Description = "<p>You create a 20-foot-radius Sphere of poisonous, yellow-green fog centered on a point you choose within range. The fog spreads around corners. It lasts for the Duration or until strong wind disperses the fog, ending the spell. Its area is heavily obscured.</p><p>When a creature enters the spell’s area for the first time on a turn or starts its turn there, that creature must make a Constitution saving throw. The creature takes 5d8 poison damage on a failed save, or half as much damage on a successful one. Creatures are affected even if they hold their breath or don’t need to breathe.</p><p>The fog moves 10 feet away from you at the start of each of your turns, rolling along the surface of the ground. The vapors, being heavier than air, sink to the lowest level of the land, even pouring down openings.</p>",
                    Level = 5,
                    Name = "Cloudkill",
                    SpellRangeID = r120f,
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true
                    },
                    SpellDurationID = d10cminutes,
                    SpellSchoolID = conjuration
                },
                new Spell
                {
                    CampaignID = campaignID,
                    CastingTimeID = t1Action,
                    Description = "<p>This spell allows you to change the appearance of any number of creatures that you can see within range. You give each target you choose a new, illusory appearance. An unwilling target can make a Charisma saving throw, and if it succeeds, it is unaffected by this spell.</p><p>The spell disguises physical appearance as well as clothing, armor, weapons, and equipment. You can make each creature seem 1 foot shorter or taller and appear thin, fat, or in between. You can’t change a target’s body type, so you must choose a form that has the same basic arrangement of limbs. Otherwise, the extent of the illusion is up to you. The spell lasts for the duration, unless you use your action to dismiss it sooner.</p><p>The changes wrought by this spell fail to hold up to physical inspection. For example, if you use this spell to add a hat to a creature’s outfit, objects pass through the hat, and anyone who touches it would feel nothing or would feel the creature’s head and hair. If you use this spell to appear thinner than you are, the hand of someone who reaches out to touch you would bump into you while it was seemingly still in midair.</p><p>A creature can use its action to inspect a target and make an Intelligence (Investigation) check against your spell save DC. If it succeeds, it becomes aware that the target is disguised.</p>",
                    Level = 5,
                    Name = "Seeming",
                    SpellRangeID = r30f,
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true
                    },
                    SpellDurationID = d8hours,
                    SpellSchoolID = illusion
                },

                #endregion

                #region Level 4

                new Spell
                {
                    CampaignID = campaignID,
                    AtHigherLevels = "<p>When you cast this spell using a spell slot of 5th level or higher, the bludgeoning damage increases by 1d8 for each slot level above 4th.</p>",
                    CastingTimeID = t1Action,
                    Description = "<p>A hail of rock-hard ice pounds to the ground in a 20-foot-radius, 40-foot-high cylinder centered on a point within range. Each creature in the cylinder must make a Dexterity saving throw. A creature takes 2d8 bludgeoning damage and 4d6 cold damage on a failed save, or half as much damage on a successful one. Hailstones turn the storm’s area of effect into difficult terrain until the end of your next turn.</p>",
                    Level = 4,
                    Name = "Ice Storm",
                    SpellRange = new SpellRange
                    {
                        Amount = 300,
                        Unit = "feet"
                    },
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true,
                        Material = new []
                        {
                            "A pinch of dust",
                            "A few drops of water"
                        }
                    },
                    SpellDurationID = dinst,
                    SpellSchoolID = evocation
                },
                new Spell
                {
                    CampaignID = campaignID,
                    AtHigherLevels = "<p>When you cast this spell using a spell slot of 5th level or higher, the damage increases for each of its effects by ld6 for each slot level above 4th.</p>",
                    CastingTimeID = t1Action,
                    Description = "<p>A 20-foot-radius sphere of whirling air springs into existence centered on a point you choose within range. The sphere remains for the spell's duration. Each creature in the sphere when it appears or that ends its turn there must succeed on a Strength saving throw or take 2d6 bludgeoning damage.The sphere's space is difficult terrain.</p><p>Until the spell ends, you can use a bonus action on each of your turns to cause a bolt of lightning to leap from the center of the sphere toward one creature you choose within 60 feet ofthe center. Make a ranged spell attack. You have advantage on the attack roll if the target is in the sphere. On a hit, the target takes 4d6 lightning damage. </p><p> Creatures within 30 feet of the sphere have disadvantage on Wisdom(Perception) checks made to listen.</p>",
                    Level = 4,
                    Name = "Storm Sphere",
                    SpellRangeID = r150f,
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true
                    },
                    SpellDurationID = d1cminute,
                    SpellSchoolID = evocation
                },

                #endregion

                #region Level 3

                new Spell
                {
                    CampaignID = campaignID,
                    AtHigherLevels = "<p>When you cast this spell using a spell slot of 4th level or higher, you can target one additional creature for each slot level above 3rd.</p>",
                    CastingTimeID = t1Action,
                    Description = "<p>You touch a willing creature. The target gains a flying speed of 60 feet for the duration. When the spell ends, the target falls if it is still aloft, unless it can stop the fall.</p>",
                    Level = 3,
                    Name = "Fly",
                    SpellRangeID = rtouch,
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true,
                        Material = new []
                        {
                            "A wing feather from any bird"
                        }
                    },
                    SpellDurationID = d10cminutes,
                    SpellSchoolID = transmutation
                },
                new Spell
                {
                    CampaignID = campaignID,
                    CastingTimeID = t1Action,
                    Description = "<p>You transform a willing creature you touch, along with everything it’s wearing and carrying, into a misty cloud for the duration. The spell ends if the creature drops to 0 hit points. An incorporeal creature isn’t affected.</p><p>While in this form, the target’s only method of movement is a flying speed of 10 feet. The target can enter and occupy the space of another creature. The target has resistance to nonmagical damage, and it has advantage on Strength, Dexterity, and Constitution saving throws. The target can pass through small holes, narrow openings, and even mere cracks, though it treats liquids as though they were solid surfaces. The target can’t fall and remains hovering in the air even when stunned or otherwise incapacitated.</p><p>While in the form of a misty cloud, the target can’t talk or manipulate objects, and any objects it was carrying or holding can’t be dropped, used, or otherwise interacted with. The target can’t attack or cast spells.</p>",
                    Level = 3,
                    Name = "Gaseous Form",
                    SpellRangeID = rtouch,
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true,
                        Material = new []
                        {
                            "A bit of gauze",
                            "A wisp of smoke"
                        }
                    },
                    SpellDurationID = d1chour,
                    SpellSchoolID = transmutation
                },
                new Spell
                {
                    CampaignID = campaignID,
                    AtHigherLevels = "<p>When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot above 3rd.</p>",
                    CastingTimeID = t1Action,
                    Description = "<p>A stroke of lightning forming a line 100 feet long and 5 feet wide blasts out from you in a direction you choose. Each creature in the line must make a Dexterity saving throw. A creature takes 8d6 lightning damage on a failed save, or half as much damage on a successful one. The lightning ignites flammable objects in the area that aren’t being worn or carried.</p>",
                    Level = 3,
                    Name = "Lightning Bolt",
                    SpellRange = new SpellRange
                    {
                        Amount = 100,
                        Self = true,
                        Shape = "line",
                        Unit = "foot"
                    },
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true,
                        Material = new[]
                        {
                            "A bit of fur",
                            "A rod of amber, crystal, or glass"
                        }
                    },
                    SpellDurationID = dinst,
                    SpellSchoolID = evocation
                },

                #endregion

                #region Level 2

                new Spell
                {
                    CampaignID = campaignID,
                    AtHigherLevels = "<p>When you cast this spell using a spell slot of 3rd level or higher, the damage increases by ld8 for each slot level above 2nd.</p>",
                    CastingTimeID = t1Action,
                    Description = "<p>Choose an unoccupied 5-foot cube of air that you can see within range. An elemental force that resembles a dust devil appears in the cube and lasts for the spell's duration.</p><p>Any creature that ends its turn within 5 feet of the dust devil must make a Strength saving throw. On a failed save, the creature takes ld8 bludgeoning damage and is pushed 10 feet away. On a successful save, the creature takes half as much damage and isn't pushed. </p><p>As a bonus action, you can move the dust devil up to 30 feet in any direction. If the dust devil moves over sand, dust, loose dirt, or small gravel, it sucks up the material and forms a 10-foot-radius cloud of debris around itself that lasts until the start of your next turn. The cloud heavily obscures its area.</p>",
                    Level = 2,
                    Name = "Dust Devil",
                    SpellRangeID = r60f,
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true,
                        Material = new[]
                        {
                            "A pinch of dust"
                        }
                    },
                    SpellDurationID = d1cminute,
                    SpellSchoolID = conjuration
                },
                new Spell
                {
                    CampaignID = campaignID,
                    CastingTimeID = t1Action,
                    Description = "<p>A line of strong wind 60 feet long and 10 feet wide blasts from you in a direction you choose for the spell's Duration. Each creature that starts its turn in the line must succeed on a Strength saving throw or be pushed 15 feet away from you in a direction following the line.</p><p>Any creature in the line must spend 2 feet of Movement for every 1 foot it moves when moving closer to you.</p><p>The gust disperses gas or vapor, and it extinguishes candles, torches, and similar unprotected flames in the area. It causes protected flames, such as those of lanterns, to dance wildly and has a 50 percent chance to extinguish them.</p><p>As a Bonus Action on each of your turns before the spell ends, you can change the direction in which the line blasts from you.</p>",
                    Level = 2,
                    Name = "Gust of Wind",
                    SpellRange = new SpellRange
                    {
                        Amount = 60,
                        Unit = "foot",
                        Shape = "line",
                        Self = true,
                    },
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true,
                        Material = new []
                        {
                            "A legume seed"
                        }
                    },
                    SpellDurationID = d1cminute,
                    SpellSchoolID = evocation
                },
                new Spell
                {
                    CampaignID = campaignID,
                    AtHigherLevels = "<p>When you cast this spell using a spell slot of 3rd level or higher, you can target one additional creature for each slot level above 2nd.</p>",
                    CastingTimeID = t1Action,
                    Description = "<p>A creature you touch becomes invisible until the spell ends. Anything the target is wearing or carrying is invisible as long as it is on the target’s person. The spell ends for a target that attacks or casts a spell.</p>",
                    Level = 2,
                    Name = "Invisibility",
                    SpellRangeID = rtouch,
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true,
                        Material = new []
                        {
                            "An eyelash encased in gum arabic"
                        }
                    },
                    SpellDurationID = d1chour,
                    SpellSchoolID = illusion
                },

                #endregion

                #region Level 1

                new Spell
                {
                    CampaignID = campaignID,
                    AtHigherLevels = "<p>When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st. The creatures must be within 30 feet of each other when you target them.</p>",
                    CastingTimeID = t1Action,
                    Description = "<p>You attempt to charm a humanoid you can see within range. It must make a Wisdom saving throw, and does so with advantage if you or your companions are fighting it. If it fails the saving throw, it is Charmed by you until the spell ends or until you or your companions do anything harmful to it. The Charmed creature regards you as a friendly acquaintance. When the spell ends, the creature knows it was Charmed by you.</p>",
                    Level = 1,
                    Name = "Charm Person",
                    SpellRangeID = r30f,
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true
                    },
                    SpellDurationID = d1hour,
                    SpellSchoolID = enchantment
                },
                new Spell
                {
                    CampaignID = campaignID,
                    CastingTime = new CastingTime
                    {
                        Amount = 1,
                        Unit = "reaction",
                        ReactionCondition = "which you take when you or a creature within 60 feet of you falls"
                    },
                    Description = "<p>Choose up to five Falling creatures within range. A Falling creature's rate of descent slows to 60 feet per round until the spell ends. If the creature lands before the spell ends, it takes no Falling damage and can land on its feet, and the spell ends for that creature.</p>",
                    Level = 1,
                    Name = "Feather Fall",
                    SpellRangeID = r60f,
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Material = new []
                        {
                            "A small feather or piece of down"
                        }
                    },
                    SpellDurationID = d1minute,
                    SpellSchoolID = transmutation
                },
                new Spell
                {
                    CampaignID = campaignID,
                    CastingTimeID = t1Action,
                    Description = "<p>You touch a willing creature who isn't wearing armor, and a protective magical force surrounds it until the spell ends. The target's base AC becomes 13 + its Dexterity modifier. The spell ends it if the target dons armor or if you dismiss the spell as an action.</p>",
                    Level = 1,
                    Name = "Mage Armor",
                    SpellRangeID = rtouch,
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true,
                        Material = new[]
                        {
                            "A piece of cured leather"
                        }
                    },
                    SpellDurationID = d8hours,
                    SpellSchoolID = abjuration
                },
                new Spell
                {
                    CampaignID = campaignID,
                    AtHigherLevels = "<p>When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st.</p>",
                    CastingTimeID = t1Action,
                    Description = "<p>A wave of thunderous force sweeps out from you. Each creature in a 15-foot cube originating from you must make a Constitution saving throw. On a failed save, a creature takes 2d8 thunder damage and is pushed 10 feet away from you. On a successful save, the creature takes half as much damage and isn't pushed.</p><p>In addition, unsecured Objects that are completely within the area of effect are automatically pushed 10 feet away from you by the spell's effect, and the spell emits a thunderous boom audible out to 300 feet.</p>",
                    Level = 1,
                    Name = "Thunderwave",
                    SpellRange = new SpellRange
                    {
                        Self = true,
                        Amount = 15,
                        Unit = "foot",
                        Shape = "cube"
                    },
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true
                    },
                    SpellDurationID = dinst,
                    SpellSchoolID = evocation
                },

                #endregion

                #region Cantrips

                new Spell
                {
                    CampaignID = campaignID,
                    CastingTimeID = t1Action,
                    Description = "<p>You seize the air and compel it to create one of the following effects at a point you can see within range:</p><ul><li>One Medium or smaller creature that you choose must succeed on a Strength saving throw or be pushed up to 5 feet away from you.</li><li>You create a small blast of air capable of moving one object that is neither held nor carried and that weighs no more than 5 pounds. The object is pushed up to 10 feet away from you. It isn't pushed with enough force to cause damage. </li><li>You create a harmless sensory affect using air, such as causing leaves to rustle, wind to slam shutters shut, or your clothing to ripple in a breeze.</li></ul>",
                    Level = 0,
                    Name = "Gust",
                    SpellRangeID = r30f,
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true
                    },
                    SpellDurationID = dinst,
                     SpellSchoolID = transmutation
                },
                new Spell
                {
                    CampaignID = campaignID,
                    CastingTimeID = t1Action,
                    Description = "<p>A spectral, floating hand appears at a point you choose within range. The hand lasts for the Duration or until you dismiss it as an action. The hand vanishes if it is ever more than 30 feet away from you or if you cast this spell again.</p><p>You can use your action to control the hand. You can use the hand to manipulate an object, open an unlocked door or container, stow or retrieve an item from an open container, or pour the contents out of a vial. You can move the hand up to 30 feet each time you use it.</p><p>The hand can't Attack, activate magical items, or carry more than 10 pounds.</p>",
                    Level = 0,
                    Name = "Mage Hand",
                    SpellRangeID = r30f,
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true
                    },
                    SpellDurationID = d1minute,
                     SpellSchoolID = conjuration
                },
                new Spell
                {
                    CampaignID = campaignID,
                    CastingTimeID = t1Action,
                    Description = "<p>You point your finger toward a creature within range and whisper a message. The target (and only the target) hears the message and can reply in a whisper that only you can hear.</p><p>You can cast this spell through solid objects if you are familiar with the target and know it is beyond the barrier. Magical silence, 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood blocks the spell. The spell doesn’t have to follow a straight line and can travel freely around corners or through openings.</p>",
                    Level = 0,
                    Name = "Message",
                    SpellRangeID = r120f,
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true,
                        Material = new []
                        {
                            "A short piece of copper wire"
                        }
                    },
                    SpellDurationID = d1round,
                    SpellSchoolID = transmutation
                },
                new Spell
                {
                    CampaignID = campaignID,
                    CastingTimeID = t1Action,
                    Description = "<p>This spell is a minor magical trick that novice spellcasters use for practice. You create one of the following magical Effects within range.</p><ul><li>You create an Instantaneous, harmless sensory effect, such as a shower of sparks, a puff of wind, faint musical notes, or an odd odor.</li><li>You instantaneously light or snuff out a Candle, a torch, or a small campfire.</li><li>You instantaneously clean or soil an object no larger than 1 cubic foot.</li><li>You chill, warm, or flavor up to 1 cubic foot of nonliving material for 1 hour.</li><li>You make a color, a small mark, or a Symbol appear on an object or a surface for 1 hour.</li><li>You create a nonmagical trinket or an illusory image that can fit in your hand and that lasts until the end of your next turn.</li></ul><p>If you cast this spell multiple times, you can have up to three of its non-instantaneous Effects active at a time, and you can dismiss such an effect as an action.</p>",
                    Level = 0,
                    Name = "Prestidigitation",
                    SpellRange = new SpellRange
                    {
                        Amount = 10,
                        Unit = "feet"
                    },
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true
                    },
                    SpellDuration = new SpellDuration
                    {
                        UpTo = true,
                        Amount = 1,
                        Unit = "hour"
                    },
                    SpellSchoolID = transmutation
                },
                new Spell
                {
                    CampaignID = campaignID,
                    AtHigherLevels = "<p>The spell's damage increases by 1d8 when you reach 5th level, and for every 6 levels beyond</p>",
                    CastingTimeID = t1Action,
                    Description = "<p>A frigid beam of blue-white light streaks toward a creature within range. Make a ranged spell Attack against the target. On a hit, it takes 1d8 cold damage, and its speed is reduced by 10 feet until the start of your next turn.</p>",
                    Level = 0,
                    Name = "Ray of Frost",
                    SpellRangeID = r60f,
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true
                    },
                    SpellDurationID = dinst,
                    SpellSchoolID = evocation
                },
                new Spell
                {
                    CampaignID = campaignID,
                    AtHigherLevels = "<p>The spell's damage increases by 1d8 when you reach 5th level, and for every 6 levels beyond</p>",
                    CastingTimeID = t1Action,
                    Description = "<p>Lightning springs from your hand to deliver a shock to a creature you try to touch. Make a melee spell attack against the target. You have advantage on the attack roll if the target is wearing armor made of metal. On a hit, the target takes 1d8 lightning damage, and it can’t take reactions until the start of its next turn.</p>",
                    Level = 0,
                    Name = "Shocking Grasp",
                    SpellRangeID = rtouch,
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true
                    },
                    SpellDurationID = dinst,
                    SpellSchoolID = evocation
                }

                #endregion
            };
        }

        private List<CastingTime> CreateDandDCastingTimes(ApplicationDbContext ctx)
        {
            List<CastingTime> times = new List<CastingTime>
            {
                new CastingTime
                {
                    Amount = 1,
                    Unit = "action"
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
                    Amount = 30,
                    Unit = "feet"
                },
                new SpellRange
                {
                    Amount = 60,
                    Unit = "feet"
                },
                new SpellRange
                {
                    Amount = 120,
                    Unit = "feet"
                },
                new SpellRange
                {
                    Amount = 150,
                    Unit = "feet"
                },
                new SpellRange
                {
                    Touch = true
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
                    Amount = 1,
                    Unit = "round"
                },
                new SpellDuration
                {
                    Amount = 1,
                    Unit = "minute"
                },
                new SpellDuration
                {
                    Amount = 1,
                    Unit = "minute",
                    Concentration = true
                },
                new SpellDuration
                {
                    Amount = 10,
                    Unit = "minutes",
                    Concentration = true
                },
                new SpellDuration
                {
                    Amount = 1,
                    Unit = "hour"
                },
                new SpellDuration
                {
                    Amount = 1,
                    Unit = "hour",
                    Concentration = true
                },
                new SpellDuration
                {
                    Amount = 8,
                    Unit = "hours"
                },
                new SpellDuration
                {
                    Instantaneous = true
                },
            };
            ctx.SpellDurations.AddRange(durations);

            return durations;
        }

        #endregion
    }
}
