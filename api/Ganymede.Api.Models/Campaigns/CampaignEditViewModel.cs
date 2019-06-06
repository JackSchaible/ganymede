using Ganymede.Api.Models.Rulesets;
using System.Collections.Generic;

namespace Ganymede.Api.Models.Campaigns
{
    public class CampaignEditViewModel
    {
        public CampaignEditModel Campaign { get; set; }
        public List<RulesetViewModel> Rulesets { get; set; }
    }
}
