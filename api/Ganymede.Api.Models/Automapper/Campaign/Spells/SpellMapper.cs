using AutoMapper;
using Ganymede.Api.Data.Spells;

namespace Ganymede.Api.Models.Automapper.Campaign.Spells
{
    public class SpellMapper : Profile
    {
        public SpellMapper() => CreateMap<Spell, Spell>()
            .ForMember(dest => dest.CastingTime, opt => opt.MapFrom(src => src.CastingTime))
            .ForMember(dest => dest.SpellComponents, opt => opt.MapFrom(src => src.SpellComponents))
            .ForMember(dest => dest.SpellDuration, opt => opt.MapFrom(src => src.SpellDuration))
            .ForMember(dest => dest.SpellRange, opt => opt.MapFrom(src => src.SpellRange))
            .ForMember(dest => dest.SpellSchool, opt => opt.MapFrom(src => src.SpellSchool));
    }
}
