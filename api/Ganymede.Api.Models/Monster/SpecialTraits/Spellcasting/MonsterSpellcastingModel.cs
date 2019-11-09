using AutoMapper;
using Ganymede.Api.Data.Monsters.SpecialTraits.Spellcasting;

namespace Ganymede.Api.Models.Monster.SpecialTraits.Spellcasting
{
    public abstract class MonsterSpellcastingModel
    {
        public int ID { get; set; }
        public bool Psionic { get; set; }
        public string SpellcastingAbility { get; set; }
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
