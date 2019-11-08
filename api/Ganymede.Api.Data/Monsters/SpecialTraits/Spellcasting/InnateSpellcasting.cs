using System.Collections.Generic;

namespace Ganymede.Api.Data.Monsters.SpecialTraits.Spellcasting
{
    public class InnateSpellcasting : MonsterSpellcasting
    {
        public ICollection<InnateSpellcastingSpellsPerDay> SpellsPerDay { get; set; }
    }
}
