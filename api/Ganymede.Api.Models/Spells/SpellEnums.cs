namespace Ganymede.Api.Models.Spells
{
    public static class SpellEnums
    {
        public enum CastingTimeType
        {
            Action,
            Reaction,
            Time,
            BonusAction
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
