using Ganymede.Api.Data.Common;
using Ganymede.Api.Data.Monster.BasicStats;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Monsters.BasicStats
{
    public class BasicStatsModel
    {
        public int ID { get; set; }

        public int ArmorClassID { get; set; }
        [ForeignKey("ArmorClassID")]
        public ArmorClass AC { get; set; }

        public int DiceRollID { get; set; }
        [ForeignKey("DiceRollID")]
        public DiceRoll HPDice { get; set; }

        public int MovementID { get; set; }
        [ForeignKey("MovementID")]
        public MonsterMovement Movement { get; set; }
    }
}
