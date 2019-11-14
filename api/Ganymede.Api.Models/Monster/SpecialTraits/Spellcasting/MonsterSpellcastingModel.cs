using AutoMapper;
using Ganymede.Api.Data.Monsters.SpecialTraits.Spellcasting;
using static Ganymede.Api.Models.Common.CommonEnums;

namespace Ganymede.Api.Models.Monster.SpecialTraits.Spellcasting
{
    public abstract class MonsterSpellcastingModel
    {
        public int ID { get; set; }
        public bool Psionic { get; set; }
        public Abilities SpellcastingAbility { get; set; }
        public SpellcastingEnums.SpellcastingTypes SpellcastingType { get; set; }
    }

    public class MonsterSpellcastingModelMapper : Profile
    {
        public MonsterSpellcastingModelMapper()
        {
            CreateMap<MonsterSpellcastingModel, MonsterSpellcasting>();
            CreateMap<MonsterSpellcasting, MonsterSpellcastingModel>();
        }
    }
}
