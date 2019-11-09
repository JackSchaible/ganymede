using AutoMapper;

namespace Ganymede.Api.Models.Equipment
{
    public abstract class EquipmentModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal PriceInGold { get; set; }
        public decimal WeightInPounds { get; set; }
    }

    public class EquipmentModelMapper : Profile
    {
        public EquipmentModelMapper()
        {
            CreateMap<EquipmentModel, Data.Equipment.Equipment>()
                .ForMember(d => d.Monsters, o => o.Ignore());
            CreateMap<Data.Equipment.Equipment, EquipmentModel>();
        }
    }
}
