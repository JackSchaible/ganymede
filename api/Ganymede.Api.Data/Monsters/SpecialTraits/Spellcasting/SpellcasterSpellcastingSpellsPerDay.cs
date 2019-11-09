using Ganymede.Api.Data.Spells;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Monsters.SpecialTraits.Spellcasting
{
    public class SpellcasterSpellsPerDay
    {
        public int ID { get; set; }
        public int NumberPerDay { get; set; }

        public int SpellcastingID { get; set; }
        [ForeignKey(nameof(SpellcastingID))]
        public Spellcaster Spellcaster { get; set; }

        public virtual ICollection<Spell> Spells { get; set; }
    }
}
