using AutoMapper;
using Ganymede.Api.Data.Monsters.SpecialTraits.Spellcasting;
using Ganymede.Api.Models.Spells;

namespace Ganymede.Api.Models.Monster.SpecialTraits.Spellcasting
{
    public class InnateSpellModel
    {
        public SpellModel Spell { get; set; }
        public string SpecialConditions { get; set; }
    }

    public class InnateSpellModelMapper : Profile
    {
        public InnateSpellModelMapper()
        {
            CreateMap<InnateSpellModel, InnateSpell>()
                .ForMember(d => d.InnateSpellcastingSpellsPerDayID, o => o.Ignore())
                .ForMember(d => d.InnateSpellcastingSpellsPerDay, o => o.Ignore());
            CreateMap<InnateSpell, InnateSpellModel>();
        }
    }
}
