using Ganymede.Api.Data.Monsters;
using System.Collections.Generic;

namespace Ganymede.Api.Data.Equipment
{
    public class Equipment
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal PriceInGold { get; set; }
        public decimal WeightInPounds { get; set; }

        public virtual ICollection<MonsterEquipment> Monsters { get; set; }
    }
}
