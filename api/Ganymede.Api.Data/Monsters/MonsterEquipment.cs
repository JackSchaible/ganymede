using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Monsters
{
    public class MonsterEquipment
    {
        public int MonsterID { get; set; }
        [ForeignKey(nameof(MonsterID))]
        public Monster Monster { get; set; }

        public int EquipmentID { get; set; }
        [ForeignKey(nameof(EquipmentID))]
        public Equipment.Equipment Equipment { get; set; }   
    }
}
