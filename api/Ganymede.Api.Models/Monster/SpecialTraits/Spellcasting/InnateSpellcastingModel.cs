using AutoMapper;
using Ganymede.Api.Data.Monsters.SpecialTraits.Spellcasting;
using System.Collections.Generic;
using System.Linq;

namespace Ganymede.Api.Models.Monster.SpecialTraits.Spellcasting
{
    public class InnateSpellcastingModel : MonsterSpellcastingModel
    {
        public Dictionary<int, List<InnateSpellModel>> SpellsPerDay { get; set; }
    }

    public class InnateSpellcastingModelMapper : Profile
    {
        public InnateSpellcastingModelMapper()
        {
            CreateMap<InnateSpellcastingModel, InnateSpellcasting>()
                .ForMember(d => d.SpellsPerDay, o => o.Ignore())
                .ForMember(d => d.Spellcasting, o => o.MapFrom(s => new MonsterSpellcasting
                {
                    ID = s.ID,
                    Psionic = s.Psionic,
                    SpellcastingAbility = s.SpellcastingAbility,
                    SpellcastingType = (int)s.SpellcastingType
                }));
            CreateMap<InnateSpellcasting, InnateSpellcastingModel>()
                .ForMember(d => d.SpellsPerDay, o => o.MapFrom(s => ConvertSpellsPerDay(s)))
                .ForMember(d => d.Psionic, o => o.MapFrom(s => s.Spellcasting.Psionic))
                .ForMember(d => d.SpellcastingAbility, o => o.MapFrom(s => s.Spellcasting.SpellcastingAbility))
                .ForMember(d => d.SpellcastingType, o => o.MapFrom(s => s.Spellcasting.SpellcastingType));
        }

        private Dictionary<int, List<InnateSpellModel>> ConvertSpellsPerDay(InnateSpellcasting s)
        {
            var spdModel = new Dictionary<int, List<InnateSpellModel>>();

            foreach (var spd in s.SpellsPerDay)
                spdModel.Add(spd.NumberPerDay, Mapper.Map<List<InnateSpell>, List<InnateSpellModel>>(spd.Spells.ToList()));

            return spdModel;
        }
    }
}
