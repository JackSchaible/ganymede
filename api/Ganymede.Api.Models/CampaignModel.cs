using AutoMapper;
using Ganymede.Api.Data;
using Ganymede.Api.Models.Monster;
using Ganymede.Api.Models.Rulesets;
using Ganymede.Api.Models.Spells;
using System.Collections.Generic;

namespace Ganymede.Api.Models.Campaigns
{
    public class CampaignModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string User { get; set; }

        public RulesetModel Ruleset { get; set; }

        public List<MonsterModel> Monsters { get; set; }
        public List<SpellModel> Spells { get; set; }
    }

    public class CampaignMapper : Profile
    {
        public CampaignMapper()
        {
            CreateMap<CampaignModel, Campaign>()
                .ForMember(dest => dest.AppUserId, opt => opt.Ignore())
                .ForMember(dest => dest.User, opt => opt.Ignore());
            CreateMap<Campaign, CampaignModel>();
        }
    }
}
