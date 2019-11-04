using System.Collections.Generic;

namespace Ganymede.Api.Models.Monster.SpecialTraits.Spellcasting
{
    public class InnateSpellcastingModel : MonsterSpellcastingModel
    {
        public Dictionary<int, List<InnateSpellModel>> SpellsPerDay { get; set; }
    }
}
