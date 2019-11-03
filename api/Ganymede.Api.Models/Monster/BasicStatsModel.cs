using AutoMapper;
using Ganymede.Api.Data.Monsters;

namespace Ganymede.Api.Models.Monster
{
    public class BasicStatsModel
    {
        public int ID { get; set; }
        public float CR { get; set; }
        public int XP { get; set; }
        public int Strength { get; set; }
        public int Dexterity { get; set; }
        public int Constitution { get; set; }
        public int Intelligence { get; set; }
        public int Wisdom { get; set; }
        public int Charisma { get; set; }
    }

    public class BasicStatsMapper: Profile
    {
        public BasicStatsMapper()
        {
            CreateMap<BasicStatsModel, BasicStats>()
                .ForMember(dest => dest.Monster, opt => opt.Ignore())
                .ForMember(dest => dest.MonsterID, opt => opt.Ignore());
            CreateMap<BasicStats, BasicStatsModel>();
        }
    }
}
