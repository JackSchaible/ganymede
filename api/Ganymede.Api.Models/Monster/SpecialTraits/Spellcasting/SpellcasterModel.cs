using Ganymede.Api.Models.Spells;
using System.Collections.Generic;

namespace Ganymede.Api.Models.Monster.SpecialTraits.Spellcasting
{
    public class SpellcasterModel : MonsterSpellcastingModel
    {
        public int SpellcasterLevel { get; set; }
        public Dictionary<int, List<SpellModel>> SpellsPerDay { get; set; }
    }
}
