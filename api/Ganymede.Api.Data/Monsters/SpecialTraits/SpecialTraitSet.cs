using Ganymede.Api.Data.Monsters.SpecialTraits.Spellcasting;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Monsters.SpecialTraits
{
    public class SpecialTraitSet
    {
        public int ID { get; set; }
        public virtual ICollection<SpecialTrait> SpecialTraits { get; set; }

        public int? MonsterSpellcastingID { get; set; }
        [ForeignKey(nameof(MonsterSpellcastingID))]
        public MonsterSpellcasting SpellcastingModel { get; set; }
    }
}
