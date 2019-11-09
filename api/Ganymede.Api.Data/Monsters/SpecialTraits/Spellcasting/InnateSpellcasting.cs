using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Monsters.SpecialTraits.Spellcasting
{
    public class InnateSpellcasting
    {
        [ForeignKey(nameof(Spellcasting))]
        public int ID { get; set; }
        public MonsterSpellcasting Spellcasting { get; set; }
        public ICollection<InnateSpellcastingSpellsPerDay> SpellsPerDay { get; set; }
    }
}
