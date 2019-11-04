using AutoMapper;
using Ganymede.Api.Data.Spells;
using static Ganymede.Api.Models.Spells.SpellEnums;

namespace Ganymede.Api.Models.Spells
{
    public class CastingTimeModel
    {
        public int ID { get; set; }
        public CastingTimeType Type { get; set; }
        public int Amount { get; set; }
        public string Unit { get; set; }
        public string ReactionCondition { get; set; }
    }

    public class CastingTimeMapper: Profile
    {
        public CastingTimeMapper()
        {
            CreateMap<CastingTimeModel, CastingTime>();
            CreateMap<CastingTime, CastingTimeModel>();
        }
    }
}
