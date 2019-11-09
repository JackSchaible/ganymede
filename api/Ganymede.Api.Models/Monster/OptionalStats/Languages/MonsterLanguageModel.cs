using AutoMapper;
using Ganymede.Api.Data.Monsters.OptionalStats.Languages;
using Ganymede.Api.Models.Common;

namespace Ganymede.Api.Models.Monster.OptionalStats.Languages
{
    public class MonsterLanguageModel
    {
        public LanguageModel Language { get; set; }
        public bool Understand { get; set; }
        public bool Speak { get; set; }
        public bool Read { get; set; }
        public bool Write { get; set; }
    }

    public class MonsterLanguageModelMapper : Profile
    {
        public MonsterLanguageModelMapper()
        {
            CreateMap<MonsterLanguageModel, MonsterLanguage>()
                .ForMember(d => d.MonsterLanguageSetID, o => o.Ignore())
                .ForMember(d => d.MonsterLanguageSet, o => o.Ignore());
            CreateMap<MonsterLanguage, MonsterLanguageModel>();
        }
    }
}
