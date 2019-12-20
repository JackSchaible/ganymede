using Ganymede.Api.Data.Initializers.InitializerData;
using Ganymede.Api.Data.Spells;
using System.Collections.Generic;

namespace Ganymede.Api.Data.Initializers.Spells
{
    internal class SpellConfigurationData
    {
        public ApplicationDbContext DatabaseContext { get; set; }
        public PlayerClassData PCData { get; set; }

        public List<CastingTime> CastingTimes { get; set; }
        public List<SpellRange> Ranges { get; set; }
        public List<SpellDuration> Durations { get; set; }
        public List<SpellComponents> Components { get; set; }
        public List<SpellSchool> Schools { get; set; }

        internal static class SpellConstants
        {
            public static string EncodedComma = "%2CA";

            public static class CastingTimeType
            {
                public const int Action = 0;
                public const int Reaction = 1;
                public const int Time = 2;
                public const int BonusAction = 3;
            }

            public static class DurationType
            {
                public const int Duration = 0;
                public const int Instantaneous = 1;
                public const int Until = 2;
                public const int Special = 3;
            }

            public static class RangeType
            {
                public const int Ranged = 0;
                public const int Self = 1;
                public const int Touch = 2;
                public const int Sight = 3;
                public const int Unlimited = 4;
                public const int Special = 5;
            }
        }
    }
}
