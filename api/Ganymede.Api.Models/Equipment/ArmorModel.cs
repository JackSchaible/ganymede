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
}
