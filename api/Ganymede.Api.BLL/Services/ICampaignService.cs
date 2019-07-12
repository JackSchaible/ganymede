using Ganymede.Api.Data;
using Ganymede.Api.Models.Api;
using Ganymede.Api.Models.Campaigns;

namespace Ganymede.Api.BLL.Services
{
    public interface ICampaignService
    {
        Campaign GetByUserAndId(int id, string userId);
        ApiResponse Add(CampaignEditModel campaign, string userId);
        ApiResponse Update(CampaignEditModel campaign, string userId);
        ApiResponse Delete(int id, string userId);
    }
}
