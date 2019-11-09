using Ganymede.Api.Data.Monsters.BasicStats;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Equipment
{
    public class Armor
    {
        [ForeignKey(nameof(Equipment))]
        public int ID { get; set; }
        public Equipment Equipment { get; set; }

        public int AC { get; set; }
        public int StrengthRequirement { get; set; }
        public bool StealthDisadvantage { get; set; }

        public virtual ICollection<ArmorClassArmor> ArmorClassArmors { get; set; }
    }
}
