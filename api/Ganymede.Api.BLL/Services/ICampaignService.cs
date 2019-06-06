using Ganymede.Api.Models.Api;
using Ganymede.Api.Models.Campaigns;
using System.Collections.Generic;

namespace Ganymede.Api.BLL.Services
{
    public interface ICampaignService
    {
        IEnumerable<CampaignListViewModel> ListByUser(string userId);
        CampaignEditViewModel GetByUserAndId(int id, string userId);
        ApiResponse Add(CampaignEditModel campaign, string userId);
        ApiResponse Update(CampaignEditModel campaign, string userId);
        CampaignListViewModel Clone(int id, string userId);
        ApiResponse Delete(int id, string userId);
    }
}
