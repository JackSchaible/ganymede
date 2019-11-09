using AutoMapper;
using Ganymede.Api.Data.Equipment;
using static Ganymede.Api.Models.Equipment.EquipmentEnums;

namespace Ganymede.Api.Models.Equipment
{
    public class ArmorModel : EquipmentModel
    {
        public ArmorTypes ArmorType { get; set; }
        public int AC { get; set; }
        public int StrengthRequirement { get; set; }
        public bool StealthDisadvantage { get; set; }
    }

    public class ArmorModelMapper : Profile
    {
        public ArmorModelMapper()
        {
            CreateMap<ArmorModel, Armor>()
                .ForMember(d => d.ArmorClassArmors, o => o.Ignore())
                .ForMember(d => d.Equipment, o => o.MapFrom(s => new Data.Equipment.Equipment 
                {
                    Description = s.Description,
                    ID = s.ID,
                    Name = s.Name,
                    PriceInGold = s.PriceInGold,
                    WeightInPounds = s.WeightInPounds
                }));
            CreateMap<Armor, ArmorModel>()
                .ForMember(d => d.Name, o => o.MapFrom(s => s.Equipment.Name))
                .ForMember(d => d.Description, o => o.MapFrom(s => s.Equipment.Description))
                .ForMember(d => d.PriceInGold, o => o.MapFrom(s => s.Equipment.PriceInGold))
                .ForMember(d => d.WeightInPounds, o => o.MapFrom(s => s.Equipment.WeightInPounds));
        }
    }
}
