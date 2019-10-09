using static Ganymede.Api.Data.Spells.Enums;

namespace Ganymede.Api.Data.Spells
{
    public class CastingTime
    {
        public int ID { get; set; }
        public CastingTimeType Type { get; set; }
        public int Amount { get; set; }
        public string Unit { get; set; }
        public string ReactionCondition { get; set; }
    }
}
