using Ganymede.Api.Models.Spells;
using System.Collections.Generic;

namespace Ganymede.Api.Models.Monster.SpecialTraits.Spellcasting
{
    public abstract class MonsterSpellcastingModel
    {
        public int ID { get; set; }
        public bool Psionic { get; set; }
        public string SpellcastingAbility { get; set; }
        public SpellcastingEnums.SpellcastingTypes SpellcastingType { get; set; }
    }
}
