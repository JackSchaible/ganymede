using AutoMapper;
using Ganymede.Api.Data.Monsters.BasicStats;
using Ganymede.Api.Models.Common;

namespace Ganymede.Api.Models.Monster.BasicStats
{
    public class BasicStatsSetModel
    {
        public int ID { get; set; }
        public ArmorClassModel AC { get; set; }
        public DiceRollModel HPDice { get; set; }
        public MonsterMovementModel Movement { get; set; }
    }

    public class BasicStatsMapper: Profile
    {
        public BasicStatsMapper()
        {
            CreateMap<BasicStatsSetModel, BasicStatsSet>()
                .ForMember(d => d.ArmorClassID, o => o.Ignore())
                .ForMember(d => d.DiceRollID, o => o.Ignore());
            CreateMap<BasicStatsSet, BasicStatsSetModel>();
        }
    }
}
