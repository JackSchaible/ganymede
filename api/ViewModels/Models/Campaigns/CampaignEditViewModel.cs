using api.Entities;
using api.Entities.Rulesets;
using System.Collections.Generic;

namespace api.ViewModels.Models.Campaigns
{
    public class CampaignEditViewModel
    {
        public Campaign Campaign { get; set; }
        public List<Ruleset> Rulesets { get; set; }
    }
}
