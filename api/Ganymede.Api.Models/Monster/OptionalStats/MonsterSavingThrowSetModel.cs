using AutoMapper;
using Ganymede.Api.Data.Monsters.OptionalStats;

namespace Ganymede.Api.Models.Monster.OptionalStats
{
    public class MonsterSavingThrowSetModel
    {
        public int ID { get; set; }
        public bool Strength { get; set; }
        public bool Dexterity { get; set; }
        public bool Constitution { get; set; }
        public bool Intelligence { get; set; }
        public bool Wisdom { get; set; }
        public bool Charisma { get; set; }
    }

    public class MonsterSavingThrowSetModelMapper : Profile
    {
        public MonsterSavingThrowSetModelMapper()
        {
            CreateMap<MonsterSavingThrowSetModel, MonsterSavingThrowSet>();
            CreateMap<MonsterSavingThrowSet, MonsterSavingThrowSetModel>();
        }
    }
}
