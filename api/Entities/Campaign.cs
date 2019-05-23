using api.Entities.Rulesets;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
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
