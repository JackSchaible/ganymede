using Ganymede.Api.Models.Spells;

namespace Ganymede.Api.Models.Monster.SpecialTraits.Spellcasting
{
    public class InnateSpellModel
    {
        public SpellModel Spell { get; set; }
        public string SpecialConditions { get; set; }
    }
}
