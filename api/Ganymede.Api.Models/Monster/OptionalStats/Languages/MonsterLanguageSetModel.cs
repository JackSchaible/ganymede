using AutoMapper;
using Ganymede.Api.Data.Monsters.OptionalStats.Languages;
using System.Collections.Generic;

namespace Ganymede.Api.Models.Monster.OptionalStats.Languages
{
    public class MonsterLanguageSetModel
    {
        public int ID { get; set; }
        public List<MonsterLanguageModel> Languages { get; set; }
        public int TelepathyRange { get; set; }
        public int AnyFreeLanguages { get; set; }
        public string Special { get; set; }
    }

    public class MonsterLanguageSetModelMapper : Profile
    {
        public MonsterLanguageSetModelMapper()
        {
            CreateMap<MonsterLanguageSetModel, MonsterLanguageSet>();
            CreateMap<MonsterLanguageSet, MonsterLanguageSetModel>();
        }
    }
}
