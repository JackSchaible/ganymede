using Ganymede.Api.Models.Campaigns;
using System.Collections.Generic;

namespace Ganymede.Api.Data
{
    public class UserModel
    {
        public string Email { get; set; }
        public ICollection<CampaignModel> Campaigns { get; set; }
    }
}
