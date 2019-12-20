using System.Collections.Generic;

namespace Ganymede.Api.Data.Spells
{
    public class CastingTime
    {
        public int ID { get; set; }
        public int Type { get; set; }
        public int Amount { get; set; }
        public string Unit { get; set; }
        public string ReactionCondition { get; set; }

        public virtual ICollection<SpellCastingTime> Spells { get; set; }
    }
}
