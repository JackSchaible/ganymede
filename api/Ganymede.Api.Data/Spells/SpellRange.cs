namespace Ganymede.Api.Data.Spells
{
    public class SpellRange
    {
        public int ID { get; set; }
        public int Amount { get; set; }
        public string Unit { get; set; }
        public bool Self { get; set; }
        public string Shape { get; set; }
        public bool Touch { get; set; }
        public bool Sight { get; set; }
        public bool Unlimited { get; set; }
        public bool Special { get; set; }
    }
}
