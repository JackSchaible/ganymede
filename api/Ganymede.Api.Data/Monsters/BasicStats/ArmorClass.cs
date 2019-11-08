using Ganymede.Api.Data.Monsters.BasicStats;
using System.Collections.Generic;

namespace Ganymede.Api.Data.Monster.BasicStats
{
    public class ArmorClass
    {
        public int ID { get; set; }
        public int NaturalArmorModifier { get; set; }

        public ICollection<ArmorClassArmor> ArmorClassArmors { get; set; }
    }
}
