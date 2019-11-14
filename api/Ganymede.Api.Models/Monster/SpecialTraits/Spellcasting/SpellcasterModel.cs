using AutoMapper;
using Ganymede.Api.Data.Monsters.SpecialTraits.Spellcasting;
using Ganymede.Api.Models.Characters;
using Ganymede.Api.Models.Spells;
using System.Collections.Generic;
using System.Linq;

namespace Ganymede.Api.Models.Monster.SpecialTraits.Spellcasting
{
    public class SpellcasterModel : MonsterSpellcastingModel
    {
        public int SpellcasterLevel { get; set; }
        public PlayerClassModel SpellcastingClass { get; set; }
        public int[] SpellsPerDay { get; set; }
        public List<SpellModel> PreparedSpells { get; set; }
    }

    public class SpellcasterModelMapper : Profile
    {
        public SpellcasterModelMapper()
        {
            CreateMap<SpellcasterModel, Spellcaster>()
                .ForMember(d => d.DatabaseSpellsPerDay, o => o.Ignore())
                .ForMember(d => d.PreparedSpells, o => o.Ignore())
                .ForMember(d => d.Spellcasting, o => o.MapFrom(s => new MonsterSpellcasting
                {
                    ID = s.ID,
                    Psionic = s.Psionic,
                    SpellcastingAbility = s.SpellcastingAbility,
                    SpellcastingType = (int)s.SpellcastingType
                }));
            CreateMap<Spellcaster, SpellcasterModel>()
                .ForMember(d => d.Psionic, o => o.MapFrom(s => s.Spellcasting.Psionic))
                .ForMember(d => d.SpellcastingAbility, o => o.MapFrom(s => s.Spellcasting.SpellcastingAbility))
                .ForMember(d => d.SpellcastingType, o => o.MapFrom(s => s.Spellcasting.SpellcastingType))
                .ForMember(d => d.PreparedSpells, o => o.MapFrom(s => s.PreparedSpells.Select(ps => ps.Spell)));
        }
    }
}
