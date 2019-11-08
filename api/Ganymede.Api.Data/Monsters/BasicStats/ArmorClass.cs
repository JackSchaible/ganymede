using System.Collections.Generic;

namespace Ganymede.Api.Data.Monsters.BasicStats
{
    public class ArmorClass
    {
        public int ID { get; set; }
        public int NaturalArmorModifier { get; set; }

        public ICollection<ArmorClassArmor> ArmorClassArmors { get; set; }
    }
}
