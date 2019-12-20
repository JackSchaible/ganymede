using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Spells
{
    public class SpellCastingTime
    {
        public int SpellID { get; set; }
        [ForeignKey(nameof(SpellID))]
        public Spell Spell { get; set; }

        public int CastingTimeID { get; set; }
        [ForeignKey(nameof(CastingTimeID))]
        public CastingTime CastingTime { get; set; }
    }
}
