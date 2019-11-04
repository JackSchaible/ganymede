using AutoMapper;
using Ganymede.Api.Data.Spells;
using static Ganymede.Api.Models.Spells.SpellEnums;

namespace Ganymede.Api.Models.Spells
{
    public class SpellRangeModel
    {
        public int ID { get; set; }
        public int Amount { get; set; }
        public string Unit { get; set; }
        public string Shape { get; set; }
        public RangeType Type { get; set; }
    }

    public class SpellRangeMapper : Profile
    {
        public SpellRangeMapper()
        {
            CreateMap<SpellRangeModel, SpellRange>();
            CreateMap<SpellRange, SpellRangeModel>();
        }
    }
}
