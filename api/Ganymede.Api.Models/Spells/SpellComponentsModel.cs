using AutoMapper;
using Ganymede.Api.Data.Spells;

namespace Ganymede.Api.Models.Spells
{
    public class SpellComponentsModel
    {
        public int ID { get; set; }
        public bool Verbal { get; set; }
        public bool Somatic { get; set; }
        public string[] Material { get; set; }
    }

    public class SpellComponentsMapper : Profile
    {
        public SpellComponentsMapper()
        {
            CreateMap<SpellComponentsModel, SpellComponents>()
                .ForMember(dest => dest.Material, opt => opt.MapFrom(src => string.Join("%2CA", src.Material)));
            CreateMap<SpellComponents, SpellComponentsModel>()
                .ForMember(dest => dest.Material, opt => opt.MapFrom(src => src.Material.Split("%2CA", System.StringSplitOptions.RemoveEmptyEntries)));
        }
    }
}
