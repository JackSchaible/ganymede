using AutoMapper;
using Ganymede.Api.Data.Common;

namespace Ganymede.Api.Models.Common
{
    public class DiceRollModel
    {
        public int ID { get; set; }
        public int Number { get; set; }
        public CommonEnums.DiceTypes Sides { get; set; }
    }

    public class DiceRollModelMapper : Profile
    {
        public DiceRollModelMapper()
        {
            CreateMap<DiceRollModel, DiceRoll>();
            CreateMap<DiceRoll, DiceRollModel>();
        }
    }
}
