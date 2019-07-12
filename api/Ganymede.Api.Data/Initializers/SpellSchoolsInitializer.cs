using Ganymede.Api.Data.Spells;
using System.Collections.Generic;
using System.Linq;

namespace Ganymede.Api.Data.Initializers
{
    internal class SpellSchoolsInitializer
    {
        public void Initialize(ApplicationDbContext ctx, out IEnumerable<SpellSchool> dAndDSchools, out IEnumerable<SpellSchool> pfSchools)
        {
            pfSchools = null;

            if (ctx.SpellSchools.Any())
                dAndDSchools = ctx.SpellSchools;
            else
            {
                dAndDSchools = CreateDandDSpellSchools();
                ctx.SpellSchools.AddRange(dAndDSchools);
            }
        }

        private List<SpellSchool> CreateDandDSpellSchools()
        {
            return new List<SpellSchool>
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
        }
    }
}
