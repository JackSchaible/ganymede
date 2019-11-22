using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Monsters.Actions
{
    public class Attack
    {
        [ForeignKey(nameof(Action))]
        public int ID { get; set; }
        public Action Action { get; set; }

        public int Type { get; set; }
        public int RangeMin { get; set; }
        public int RangeMax { get; set; }
        public int Target { get; set; }
        public virtual ICollection<HitEffect> HitEffects { get; set; }
        public bool ExtraGrappleRoll { get; set; }
        public string Miss { get; set; }
    }
}
