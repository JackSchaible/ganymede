using AutoMapper;
using Ganymede.Api.Data.Common;

namespace Ganymede.Api.Models.Common
{
    public class LanguageModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }

    public class LanguageModelMapper : Profile
    {
        public LanguageModelMapper()
        {
            CreateMap<LanguageModel, Language>()
                .ForMember(d => d.MonsterLanguages, o => o.Ignore());
            CreateMap<Language, LanguageModel>();
        }
    }
}
