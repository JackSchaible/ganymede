using System.Collections.Generic;

namespace Ganymede.Api.Data.Equipment.Weapons
{
    public class WeaponProperty
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual ICollection<WeaponWeaponProperties> WeaponWeaponProperties { get; set; }
    }
}
