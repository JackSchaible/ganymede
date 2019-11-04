using Ganymede.Api.Models.Monster.SpecialTraits.Spellcasting;
using System.Collections.Generic;

namespace Ganymede.Api.Models.Monster.SpecialTraits
{
    public class SpecialTraitsModel
    {
        public int ID { get; set; }
        public List<SpecialTraitsModel> SpecialTraits { get; set; }
        public MonsterSpellcastingModel SpellcastingModel { get; set; }
    }
}
