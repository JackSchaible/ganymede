using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Equipment.Weapons
{
    public class WeaponWeaponProperties
    {
        public int WeaponID { get; set; }
        [ForeignKey(nameof(WeaponID))]
        public Weapon Weapon { get; set; }

        public int WeaponPropertyID { get; set; }
        [ForeignKey(nameof(WeaponPropertyID))]
        public WeaponProperty WeaponProperty { get; set; }
    }
}
