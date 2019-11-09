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
}
