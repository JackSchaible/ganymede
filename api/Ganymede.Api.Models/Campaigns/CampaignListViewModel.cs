using Ganymede.Api.Models.Rulesets;

namespace Ganymede.Api.Models.Campaigns
{
    public class CampaignListViewModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public RulesetViewModel Ruleset { get; set; }
    }
}
