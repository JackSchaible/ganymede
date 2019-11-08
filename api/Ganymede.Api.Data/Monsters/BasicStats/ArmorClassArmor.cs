using Ganymede.Api.Data.Equipment;
using Ganymede.Api.Data.Monster.BasicStats;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Monsters.BasicStats
{
    public class ArmorClassArmor
    {
        public int ArmorID { get; set; }
        [ForeignKey("ArmorID")]
        public Armor Armor { get; set; }

        public int ArmorClassID { get; set; }
        [ForeignKey("ArmorClassID")]
        public ArmorClass ArmorClass { get; set; }
    }
}
