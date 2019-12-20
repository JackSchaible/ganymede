using Ganymede.Api.Data.Initializers.InitializerData;
using Ganymede.Api.Data.Spells;
using System.Collections.Generic;
using System.Linq;
using static Ganymede.Api.Data.Initializers.Spells.SpellConfigurationData;

namespace Ganymede.Api.Data.Initializers.Spells
{
    internal class SpellsDnDInitializer
    {
        private SpellConfigurationData _configData;

        public SpellData Initialize(ApplicationDbContext ctx, Campaign campaign, PlayerClassData pcData, MarkdownParser parser)
        {
            _configData = new SpellConfigurationData
            {
                DatabaseContext = ctx,
                PCData = pcData,
                CastingTimes = new List<CastingTime>(),
                Components = new List<SpellComponents>(),
                Durations = new List<SpellDuration>(),
                Ranges = new List<SpellRange>(),
                Schools = CreateSpellSchools(ctx)
            };

            var spellData = new SpellData();
            new SRDSpellsImporter().Initialize(parser, spellData, _configData);
            CreateNonSRDSpells(ctx, campaign, spellData);

            return spellData;
        }

        private List<SpellSchool> CreateSpellSchools(ApplicationDbContext ctx)
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
        private SpellData CreateNonSRDSpells(ApplicationDbContext ctx, Campaign campaign, SpellData spellData)
        {
            CastingTime oneAction = _configData.CastingTimes.First(ct => ct.Type == SpellConstants.CastingTimeType.Action);
            SpellComponents verbalAndSomatic = _configData.Components.First(sc => sc.Verbal = true && sc.Somatic == true && sc.Material == null);
            SpellDuration concentration1Minute = new SpellDuration
            {
                Amount = 1,
                Unit = "minute",
                Type = SpellConstants.DurationType.Duration,
                Concentration = true
            };

            Spell
                stormSphere = new Spell
                {
                    Campaign = campaign,
                    AtHigherLevels = "<p>When you cast this spell using a spell slot of 5th level or higher, the damage increases for each of its effects by ld6 for each slot level above 4th.</p>",
                    Description = "<p>A 20-foot-radius sphere of whirling air springs into existence centered on a point you choose within range. The sphere remains for the spell's duration. Each creature in the sphere when it appears or that ends its turn there must succeed on a Strength saving throw or take 2d6 bludgeoning damage.The sphere's space is difficult terrain.</p><p>Until the spell ends, you can use a bonus action on each of your turns to cause a bolt of lightning to leap from the center of the sphere toward one creature you choose within 60 feet ofthe center. Make a ranged spell attack. You have advantage on the attack roll if the target is in the sphere. On a hit, the target takes 4d6 lightning damage. </p><p> Creatures within 30 feet of the sphere have disadvantage on Wisdom(Perception) checks made to listen.</p>",
                    Level = 4,
                    Name = "Storm Sphere",
                    SpellRange = _configData.Ranges.First(sr => sr.Amount == 150 && sr.Unit == "feet" && sr.Type == SpellConstants.RangeType.Ranged),
                    SpellComponents = verbalAndSomatic,
                    SpellDuration = concentration1Minute,
                    SpellSchool = _configData.Schools.First(s => s.Name == "Evocation")
                },
                dustDevil = new Spell
                {
                    Campaign = campaign,
                    AtHigherLevels = "<p>When you cast this spell using a spell slot of 3rd level or higher, the damage increases by ld8 for each slot level above 2nd.</p>",
                    Description = "<p>Choose an unoccupied 5-foot cube of air that you can see within range. An elemental force that resembles a dust devil appears in the cube and lasts for the spell's duration.</p><p>Any creature that ends its turn within 5 feet of the dust devil must make a Strength saving throw. On a failed save, the creature takes ld8 bludgeoning damage and is pushed 10 feet away. On a successful save, the creature takes half as much damage and isn't pushed. </p><p>As a bonus action, you can move the dust devil up to 30 feet in any direction. If the dust devil moves over sand, dust, loose dirt, or small gravel, it sucks up the material and forms a 10-foot-radius cloud of debris around itself that lasts until the start of your next turn. The cloud heavily obscures its area.</p>",
                    Level = 2,
                    Name = "Dust Devil",
                    SpellRange = _configData.Ranges.First(sr => sr.Type == SpellConstants.RangeType.Ranged && sr.Amount == 60 && sr.Unit == "feet"),
                    SpellComponents = new SpellComponents
                    {
                        Verbal = true,
                        Somatic = true,
                        Material = "A pinch of dust"
                    },
                    SpellDuration = concentration1Minute,
                    SpellSchool = _configData.Schools.First(s => s.Name == "Conjuration")
                },
                friends = new Spell
                {
                    Campaign = campaign,
                    Description = "<p>For the duration, you have advantage on all Charisma checks directed at one creature of your choice that isn't hostile toward you. When the spell ends, the creature realizes that you used magic to influence its mood and becomes hostile toward you. A creature prone to violence might attack you. Another creature might seek retribution in other ways (at the DM's discretion), depending on the nature of your interaction with it.</p>",
                    Level = 0,
                    Name = "Friends",
                    SpellRange = _configData.Ranges.First(sr => sr.Type == SpellConstants.RangeType.Self && sr.Amount == 0 && sr.Unit == null && sr.Shape == null),
                    SpellComponents = new SpellComponents
                    {
                        Somatic = true,
                        Material = "A small amount of makeup appled to the face as this spell is cast"
                    },
                    SpellDuration = concentration1Minute,
                    SpellSchool = _configData.Schools.First(s => s.Name == "Enchantment")
                },
                gust = new Spell
                {
                    Campaign = campaign,
                    Description = "<p>You seize the air and compel it to create one of the following effects at a point you can see within range:</p><ul><li>One Medium or smaller creature that you choose must succeed on a Strength saving throw or be pushed up to 5 feet away from you.</li><li>You create a small blast of air capable of moving one object that is neither held nor carried and that weighs no more than 5 pounds. The object is pushed up to 10 feet away from you. It isn't pushed with enough force to cause damage. </li><li>You create a harmless sensory affect using air, such as causing leaves to rustle, wind to slam shutters shut, or your clothing to ripple in a breeze.</li></ul>",
                    Level = 0,
                    Name = "Gust",
                    SpellRange = _configData.Ranges.First(sr => sr.Type == SpellConstants.RangeType.Ranged && sr.Amount == 30 && sr.Unit == "feet"),
                    SpellComponents = verbalAndSomatic,
                    SpellDuration = _configData.Durations.First(sd => sd.Type == SpellConstants.DurationType.Instantaneous),
                    SpellSchool = _configData.Schools.First(s => s.Name == "Transmutation")
                };

            var spells = new List<Spell>
            {
                stormSphere,
                dustDevil,
                friends,
                gust
            };

            spellData.StormSphere = stormSphere;
            spellData.DustDevil = dustDevil;
            spellData.Friends = friends;
            spellData.Gust = gust;

            ctx.AddRange(spells);

            foreach(var spell in spells)
                ctx.SpellCastingTimes.Add
                (
                    new SpellCastingTime
                    {
                        Spell = spell,
                        CastingTime = oneAction
                    }
                );

            return spellData;
        }
    }
}
