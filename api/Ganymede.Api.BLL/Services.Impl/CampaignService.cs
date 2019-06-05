using Ganymede.Api.Data;
using Ganymede.Api.Models.Api;
using Ganymede.Api.Models.Campaigns;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Ganymede.Api.BLL.Services.Impl
{
    public class CampaignService : ICampaignService
    {
        private Dictionary<string, ApiError> _errors = new Dictionary<string, ApiError>()
        {
            {
                "NotOwner",
                new ApiError
                {
                    Field = "Owner",
                    ErrorCode = "NOT_OWNER"
                }
            }
        };

        private readonly ApplicationDbContext _ctx;
        private readonly ILogger<CampaignService> _logger;

        public CampaignService(ApplicationDbContext ctx, ILogger<CampaignService> logger)
        {
            _ctx = ctx;
            _logger = logger;
        }

        public IEnumerable<Campaign> GetByUser(string userId)
        {
            return _ctx
                .Campaigns
                .Include(c => c.Ruleset)
                .Include(c => c.Ruleset.Publisher)
                .Where(c => c.AppUserId == userId);
        }

        public CampaignEditViewModel GetByUserAndId(int id, string userId)
        {
            return new CampaignEditViewModel
            {
                Campaign = _ctx.Campaigns.Where(c => c.AppUserId == userId).Single(c => c.ID == id),
                Rulesets = _ctx.Rulesets.Include(r => r.Publisher).ToList()
            };
        }

        public ApiResponse Add(Campaign campaign, string userId)
        {
            try
            {
                campaign.AppUserId = userId;

                _ctx.Campaigns.Add(campaign);
                _ctx.SaveChanges();

                return new ApiResponse
                {
                    StatusCode = ApiCodes.Ok
                };
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return new ApiResponse
                {
                    StatusCode = ApiCodes.Error
                };
            }
        }

        public ApiResponse Update(Campaign campaign, string userId)
        {
            try
            {
                Campaign old = _ctx.Campaigns.Where(c => c.AppUserId == userId).Single(c => c.ID == campaign.ID);
                old = campaign;

                _ctx.SaveChanges();

                return new ApiResponse
                {
                    StatusCode = ApiCodes.Ok
                };
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return new ApiResponse
                {
                    StatusCode = ApiCodes.Error
                };
            }
        }

        public ApiResponse Delete(int id, string userId)
        {
            try
            {
                _ctx.Campaigns.Remove(_ctx.Campaigns.Where(c => c.AppUserId == userId).Single(c => c.ID == id));
                _ctx.SaveChanges();
                return new ApiResponse
                {
                    StatusCode = ApiCodes.Ok
                };
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return new ApiResponse
                {
                    StatusCode = ApiCodes.Error
                };
            }
        }
    }
}
