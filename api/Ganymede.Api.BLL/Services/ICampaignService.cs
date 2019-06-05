using Ganymede.Api.Data;
using Ganymede.Api.Models.Api;
using Ganymede.Api.Models.Campaigns;
using System.Collections.Generic;

namespace Ganymede.Api.BLL.Services
{
    public interface ICampaignService
    {
        IEnumerable<Campaign> GetByUser(string userId);
        CampaignEditViewModel GetByUserAndId(int id, string userId);
        ApiResponse Add(Campaign campaign, string userId);
        ApiResponse Update(Campaign campaign, string userId);
        ApiResponse Delete(int id, string userId);
    }
}
