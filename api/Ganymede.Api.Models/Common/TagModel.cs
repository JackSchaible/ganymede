using AutoMapper;
using Ganymede.Api.Data.Common;

namespace Ganymede.Api.Models.Common
{
    public class TagModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }

    public class DTagModelMapper : Profile
    {
        public DTagModelMapper()
        {
            CreateMap<TagModel, Tag>()
                .ForMember(d => d.MonsterTags, o => o.Ignore());
            CreateMap<Tag, TagModel>();
        }
    }
}
