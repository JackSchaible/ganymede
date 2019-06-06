using AutoMapper;
using Ganymede.Api.Data.Rulesets;
using Ganymede.Api.Models.Rulesets;

namespace Ganymede.Api.Models.Automapper.Rulesets
{
    public class PublisherMapper : Profile
    {
        public PublisherMapper() => CreateMap<Publisher, PublisherViewModel>();
    }
}
