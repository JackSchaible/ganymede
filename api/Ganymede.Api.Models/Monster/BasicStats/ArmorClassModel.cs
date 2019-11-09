using AutoMapper;
using Ganymede.Api.Data.Monsters.BasicStats;
using Ganymede.Api.Models.Equipment;
using System.Collections.Generic;
using System.Linq;

namespace Ganymede.Api.Models.Monster.BasicStats
{
    public class ArmorClassModel
    {
        public int ID { get; set; }
        public List<ArmorModel> ArmorItems { get; set; }
        public int NaturalArmorModifier { get; set; }
    }

    public class ArmorClassModelMapper : Profile
    {
        public ArmorClassModelMapper()
        {
            CreateMap<ArmorClassModel, ArmorClass>()
                .ForMember(d => d.ArmorClassArmors, o => o.Ignore());
            CreateMap<ArmorClass, ArmorClassModel>()
                .ForMember(d => d.ArmorItems, o => o.MapFrom(s => s.ArmorClassArmors.Select(aca => aca.Armor)));
        }
    }
}