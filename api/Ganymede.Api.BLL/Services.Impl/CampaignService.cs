using AutoMapper;
using Ganymede.Api.Data;
using Ganymede.Api.Data.Extensions;
using Ganymede.Api.Data.Spells;
using Ganymede.Api.Models.Api;
using Ganymede.Api.Models.Campaigns;
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
        private readonly IMapper _mapper;

        public CampaignService(ApplicationDbContext ctx, ILogger<CampaignService> logger, IMapper mapper)
        {
            _ctx = ctx;
            _logger = logger;
            _mapper = mapper;
        }

        public CampaignModel GetByUserAndId(int id, string userId)
        {
            Campaign campaign;

            if (id == -1)
                campaign = new Campaign();
            else
                campaign = _ctx.Campaigns
                    .IncludeCampaignData()
                    .Single(c => c.AppUserId == userId && c.ID == id);

            return _mapper.Map<Campaign, CampaignModel>(campaign);
        }

        public ApiResponse Add(CampaignModel campaignModel, string userId)
        {
            var campaign = _mapper.Map<CampaignModel, Campaign>(campaignModel);

            try
            {
                campaign.AppUserId = userId;
                campaign.ID = default;

                _ctx.Campaigns.Add(MapValues(campaign));
                _ctx.SaveChanges();

                return new ApiResponse
                {
                    StatusCode = ApiCodes.Ok,
                    InsertedID = campaign.ID
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

        public ApiResponse Update(CampaignModel campaign, string userId)
        {
            try
            {
                Campaign old = _ctx.Campaigns.Where(c => c.AppUserId == userId).Single(c => c.ID == campaign.ID);
                _mapper.Map(campaign, old);

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
                Campaign item = _ctx.Campaigns.IncludeCampaignData().Single(c => c.AppUserId == userId && c.ID == id);
                _ctx.Campaigns.Remove(item);
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

        private Campaign MapValues(Campaign campaign)
        {
            campaign.Ruleset = _ctx.Rulesets.Single(r => r.ID == campaign.Ruleset.ID);

            return campaign;
        }
    }
}
