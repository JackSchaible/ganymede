using Ganymede.Api.Data.Monsters.BasicStats;
using System.Collections.Generic;

namespace Ganymede.Api.Data.Equipment
{
    public class Armor : Equipment
    {
        public int AC { get; set; }
        public int StrengthRequirement { get; set; }
        public bool StealthDisadvantage { get; set; }

        public virtual ICollection<ArmorClassArmor> ArmorClassArmors { get; set; }
    }
}
