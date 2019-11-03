using AutoMapper;
using Ganymede.Api.Data.Spells;

namespace Ganymede.Api.Models.Spells
{
    public class SpellSchoolModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class SpellSchoolMapper : Profile
    {
        public SpellSchoolMapper()
        {
            CreateMap<SpellSchoolModel, SpellSchool>();
            CreateMap<SpellSchool, SpellSchoolModel>();
        }
    }
}
