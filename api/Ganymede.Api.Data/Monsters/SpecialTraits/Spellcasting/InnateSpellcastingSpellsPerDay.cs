using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Monsters.SpecialTraits.Spellcasting
{
    public class InnateSpellcastingSpellsPerDay
    {
        public int ID { get; set; }
        public int NumberPerDay { get; set; }

        public int SpellcastingID { get; set; }
        [ForeignKey("SpellcastingID")]
        public InnateSpellcasting Spellcasting { get; set; }

        public virtual ICollection<InnateSpell> Spells { get; set; }
    }
}
