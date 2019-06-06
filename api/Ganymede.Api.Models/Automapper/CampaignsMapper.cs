using AutoMapper;
using Ganymede.Api.Data;
using Ganymede.Api.Models.Campaigns;

namespace Ganymede.Api.Models.Automapper
{
    public class CampaignsMapper : Profile
    {
        public CampaignsMapper()
        {
            CreateMap<Campaign, CampaignListViewModel>();
            CreateMap<Campaign, CampaignEditModel>();
            CreateMap<CampaignEditModel, Campaign>()
                .ForMember(d => d.Ruleset, o => o.Ignore())
                .ForMember(d => d.AppUserId, o => o.Ignore())
                .ForMember(d => d.User, o => o.Ignore());
        }
    }
}
