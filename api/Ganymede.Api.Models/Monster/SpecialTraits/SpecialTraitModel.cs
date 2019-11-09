using AutoMapper;
using Ganymede.Api.Data.Monsters.SpecialTraits;

namespace Ganymede.Api.Models.Monster.SpecialTraits
{
    public class SpecialTraitModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class SpecialTraitModelMapper : Profile
    {
        public SpecialTraitModelMapper()
        {
            CreateMap<SpecialTraitModel, SpecialTrait>();
            CreateMap<SpecialTrait, SpecialTraitModel>();
        }
    }
}
