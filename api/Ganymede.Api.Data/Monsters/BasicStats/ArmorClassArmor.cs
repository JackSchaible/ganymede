using Ganymede.Api.Data.Equipment;
using Ganymede.Api.Data.Monsters.BasicStats;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Monsters.BasicStats
{
    public class ArmorClassArmor
    {
        public int ArmorID { get; set; }
        [ForeignKey(nameof(ArmorID))]
        public Armor Armor { get; set; }

        public int ArmorClassID { get; set; }
        [ForeignKey(nameof(ArmorClassID))]
        public ArmorClass ArmorClass { get; set; }
    }
}
