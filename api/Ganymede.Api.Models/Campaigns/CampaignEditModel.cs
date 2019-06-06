namespace Ganymede.Api.Models.Campaigns
{
    public class CampaignEditModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int RulesetID { get; set; }
    }
}
