using Ganymede.Api.Data.Monsters;
using System.Collections.Generic;

namespace Ganymede.Api.Data.Equipment
{
    public class Equipment
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public int Weight { get; set; }

        public virtual ICollection<MonsterEquipment> Monsters { get; set; }
    }
}
