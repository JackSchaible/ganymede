using AutoMapper;
using Ganymede.Api.Data.Rulesets;

namespace Ganymede.Api.Models.Rulesets
{
    public class PublisherModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }

    public class PublisherMapper : Profile
    {
        public PublisherMapper()
        {
            CreateMap<PublisherModel, Publisher>();
            CreateMap<Publisher, PublisherModel>();
        }
    }
}
