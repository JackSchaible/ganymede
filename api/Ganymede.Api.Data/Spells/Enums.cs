namespace Ganymede.Api.Data.Spells
{
    public static class Enums
    {
        public enum CastingTimeType
        {
            Action,
            Reaction,
            Time
        }

        public enum DurationType
        {
            Duration,
            Instantaneous,
            Until,
            Special
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
}
