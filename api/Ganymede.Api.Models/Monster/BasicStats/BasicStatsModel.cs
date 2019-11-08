using AutoMapper;
using Ganymede.Api.Models.Common;

namespace Ganymede.Api.Models.Monster.BasicStats
{
    public class BasicStatsModel
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
            
        }
    }
}
