using Ganymede.Api.Data.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Monsters.BasicStats
{
    public class BasicStatsSet
    {
        public int ID { get; set; }

        public int ArmorClassID { get; set; }
        [ForeignKey(nameof(ArmorClassID))]
        public ArmorClass AC { get; set; }

        public int DiceRollID { get; set; }
        [ForeignKey(nameof(DiceRollID))]
        public DiceRoll HPDice { get; set; }

        public int MovementID { get; set; }
        [ForeignKey(nameof(MovementID))]
        public MonsterMovement Movement { get; set; }
    }
}
