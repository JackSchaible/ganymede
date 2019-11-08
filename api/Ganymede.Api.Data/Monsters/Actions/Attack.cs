using System.Collections.Generic;

namespace Ganymede.Api.Data.Monsters.Actions
{
    public class Attack : Action
    {
        public int Type { get; set; }
        public int Range { get; set; }
        public int Target { get; set; }
        public virtual ICollection<HitEffect> HitEffects { get; set; }
        public bool ExtraGrappleRoll { get; set; }
        public string Miss { get; set; }
    }
}
