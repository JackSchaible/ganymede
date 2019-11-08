using Ganymede.Api.Data.Spells;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Monsters.SpecialTraits.Spellcasting
{
    public class InnateSpell
    {
        public int SpellID { get; set; }
        [ForeignKey("SpellID")]
        public Spell Spell { get; set; }

        public int InnateSpellcastingSpellsPerDayID { get; set; }
        [ForeignKey("InnateSpellcastingSpellsPerDayID")]
        public InnateSpellcastingSpellsPerDay SpellcastingSpellsPerDay { get; set; }

        public string SpecialConditions { get; set; }
    }
}
