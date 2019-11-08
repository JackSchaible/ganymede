using Ganymede.Api.Data.Spells;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Monsters.SpecialTraits.Spellcasting
{
    public class SpellcasterSpells
    {
        public int SpellcasterID { get; set; }
        [ForeignKey("SpellcasterID")]
        public Spellcaster Spellcaster { get; set; }

        public int SpellID { get; set; }
        [ForeignKey("SpellID")]
        public Spell Spell { get; set; }
    }
}
