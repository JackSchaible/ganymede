using Ganymede.Api.Data.Rulesets;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data
{
    public class Campaign
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }


        public int RulesetID { get; set; }
        [ForeignKey("RulesetID")]
        public Ruleset Ruleset { get; set; }

        public string AppUserId { get; set; }
        [ForeignKey("AppUserId")]
        public AppUser User { get; set; }
    }
}
