using Ganymede.Api.Models.Api;
using Ganymede.Api.Models.Campaigns;

namespace Ganymede.Api.BLL.Services
{
    public interface ICampaignService
    {
        CampaignModel GetByUserAndId(int id, string userId);
        ApiResponse Add(CampaignModel campaign, string userId);
        ApiResponse Update(CampaignModel campaign, string userId);
        ApiResponse Delete(int id, string userId);
    }
}
