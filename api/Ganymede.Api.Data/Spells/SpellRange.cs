using static Ganymede.Api.Data.Spells.Enums;

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
}
