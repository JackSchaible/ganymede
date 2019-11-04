namespace Ganymede.Api.Models.Equipment
{
    public class ArmorModel : EquipmentModel
    {
        public int AC { get; set; }
        public int StrengthRequirement { get; set; }
        public bool StealthDisadvantage { get; set; }
    }
}
