using Ganymede.Api.Models.Monster.SpecialTraits.Spellcasting;
using System.Collections.Generic;

namespace Ganymede.Api.Models.Monster.SpecialTraits
{
    public class SpecialTraitSetModel
    {
        public int ID { get; set; }
        public List<SpecialTraitModel> SpecialTraits { get; set; }
        public MonsterSpellcastingModel SpellcastingModel { get; set; }
    }
}
