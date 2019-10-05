namespace Ganymede.Api.Data.Spells
{
    public class SpellRange
    {
        public int ID { get; set; }
        public int Amount { get; set; }
        public string Unit { get; set; }
        public string Shape { get; set; }
        public RangeType Type { get; set; }
    }

    public enum RangeType
    {
        Ranged,
        Self,
        Touch,
        Sight,
        Unlimited,
        Special
    }
}
