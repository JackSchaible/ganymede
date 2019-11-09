using Ganymede.Api.Data.Characters;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Monsters.SpecialTraits.Spellcasting
{
    public class Spellcaster
    {
        [ForeignKey(nameof(Spellcasting))]
        public int ID { get; set; }
        public MonsterSpellcasting Spellcasting { get; set; }
        public PlayerClass SpellcastingClass { get; set; }
        public int SpellcasterLevel { get; set; }
        public virtual ICollection<SpellcasterSpells> PreparedSpells { get; set; }
    }
}
