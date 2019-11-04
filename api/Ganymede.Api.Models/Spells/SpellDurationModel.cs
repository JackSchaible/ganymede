using AutoMapper;
using Ganymede.Api.Data.Spells;
using static Ganymede.Api.Models.Spells.SpellEnums;

namespace Ganymede.Api.Models.Spells
{
    public class SpellDurationModel
    {
        public int ID { get; set; }
        public DurationType Type { get; set; }
        public int Amount { get; set; }
        public string Unit { get; set; }
        public bool Concentration { get; set; }
        public bool UpTo { get; set; }
        public bool UntilDispelled { get; set; }
        public bool UntilTriggered { get; set; }
    }

    public class SpellDurationMapper : Profile
    {
        public SpellDurationMapper()
        {
            CreateMap<SpellDurationModel, SpellDuration>();
            CreateMap<SpellDuration, SpellDurationModel>();
        }
    }
}
