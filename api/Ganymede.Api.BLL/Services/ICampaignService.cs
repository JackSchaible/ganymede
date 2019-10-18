using Ganymede.Api.Data;
using Ganymede.Api.Models.Api;

namespace Ganymede.Api.BLL.Services
{
    public interface ICampaignService
    {
        Campaign GetByUserAndId(int id, string userId);
        ApiResponse Add(Campaign campaign, string userId);
        ApiResponse Update(Campaign campaign, string userId);
        ApiResponse Delete(int id, string userId);
    }
}
