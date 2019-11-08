using Ganymede.Api.Data.Characters;
using System.Collections.Generic;

namespace Ganymede.Api.Data.Monsters.SpecialTraits.Spellcasting
{
    public class Spellcaster : MonsterSpellcasting
    {
        public PlayerClass SpellcastingClass { get; set; }
        public int SpellcasterLevel { get; set; }
        public virtual ICollection<SpellcasterSpells> PreparedSpells { get; set; }
    }
}
