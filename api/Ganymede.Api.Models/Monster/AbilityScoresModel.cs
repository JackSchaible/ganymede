using AutoMapper;
using Ganymede.Api.Data.Monsters;

namespace Ganymede.Api.Models.Monster
{
    public class AbilityScoresModel
    {
        public int ID { get; set; }
        public int Strength { get; set; }
        public int Dexterity { get; set; }
        public int Constitution { get; set; }
        public int Intelligence { get; set; }
        public int Wisdom { get; set; }
        public int Charisma { get; set; }
    }

    public class AbilityScoresModelMapper : Profile
    {
        public AbilityScoresModelMapper()
        {
            CreateMap<AbilityScoresModel, AbilityScores>();
            CreateMap<AbilityScores, AbilityScoresModel>();
        }
    }
}
