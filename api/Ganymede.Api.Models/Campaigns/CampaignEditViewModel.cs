using Ganymede.Api.Data;
using Ganymede.Api.Data.Rulesets;
using System.Collections.Generic;

namespace Ganymede.Api.Models.Campaigns
{
    public class CampaignEditViewModel
    {
        public Campaign Campaign { get; set; }
        public List<Ruleset> Rulesets { get; set; }
    }
}
