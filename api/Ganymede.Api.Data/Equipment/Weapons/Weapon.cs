using Ganymede.Api.Data.Common;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Equipment.Weapons
{
    public class Weapon
    {
        [ForeignKey(nameof(Equipment))]
        public int ID { get; set; }
        public Equipment Equipment { get; set; }

        public int DiceRollID { get; set; }
        [ForeignKey(nameof(DiceRollID))]
        public DiceRoll Damage { get; set; }

        public virtual ICollection<WeaponWeaponProperties> WeaponWeaponProperties { get; set; }
    }
}
