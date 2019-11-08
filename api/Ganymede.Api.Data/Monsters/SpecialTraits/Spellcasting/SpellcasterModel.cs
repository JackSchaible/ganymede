using Ganymede.Api.Models.Spells;
using System.Collections.Generic;

namespace Ganymede.Api.Models.Monster.SpecialTraits.Spellcasting
{
    public class SpellcasterModel : MonsterSpellcasting
    {
        public int SpellcasterLevel { get; set; }
        public List<SpellModel> PreparedSpells { get; set; }
    }
}
