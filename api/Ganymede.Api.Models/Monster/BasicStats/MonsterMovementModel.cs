using AutoMapper;
using Ganymede.Api.Data.Monsters.BasicStats;

namespace Ganymede.Api.Models.Monster.BasicStats
{
    public class MonsterMovementModel
    {
        public int ID { get; set; }
        public int Ground { get; set; }
        public int Burrow { get; set; }
        public int Climb { get; set; }
        public int Fly { get; set; }
        public bool CanHover { get; set; }
        public int Swim { get; set; }
    }

    public class MonsterMovementModelMapper : Profile
    {
        public MonsterMovementModelMapper()
        {
            CreateMap<MonsterMovementModel, MonsterMovement>();
            CreateMap<MonsterMovement, MonsterMovementModel>();
        }
    }
}
