using AutoMapper;
using Ganymede.Api.Data;
using Ganymede.Api.Data.Rulesets;
using Ganymede.Api.Models.Api;
using Ganymede.Api.Models.Campaigns;
using Ganymede.Api.Models.Rulesets;
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
        private readonly IMapper _mapper;

        public CampaignService(ApplicationDbContext ctx, ILogger<CampaignService> logger, IMapper mapper)
        {
            _ctx = ctx;
            _logger = logger;
            _mapper = mapper;
        }

        public IEnumerable<CampaignListViewModel> ListByUser(string userId)
        {
            IQueryable<Campaign> campaignPocos = _ctx.Campaigns
                .Include(c => c.Ruleset)
                .Include(c => c.Ruleset.Publisher)
                .Where(c => c.AppUserId == userId);

            IEnumerable<CampaignListViewModel> campaigns = _mapper.Map<IEnumerable<CampaignListViewModel>>(campaignPocos);
            return campaigns;
        }

        public CampaignEditViewModel GetByUserAndId(int id, string userId)
        {
            Campaign campaignPoco;

            if (id == -1)
                campaignPoco = new Campaign();
            else
                campaignPoco = _ctx.Campaigns.Where(c => c.AppUserId == userId).Single(c => c.ID == id);

            IQueryable<Ruleset> rulesetPocos = _ctx.Rulesets.Include(r => r.Publisher);

            CampaignEditViewModel model = new CampaignEditViewModel
            {
                Campaign = _mapper.Map<CampaignEditModel>(campaignPoco),
                Rulesets = _mapper.Map<List<RulesetViewModel>>(rulesetPocos)
            };

            return model;
        }

        public ApiResponse Add(CampaignEditModel campaignModel, string userId)
        {
            try
            {
                Campaign campaign = _mapper.Map<Campaign>(campaignModel);
                campaign.AppUserId = userId;
                campaign.ID = default;

                _ctx.Campaigns.Add(campaign);
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

        public ApiResponse Update(CampaignEditModel campaign, string userId)
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

        public CampaignListViewModel Clone(int campaignId, string userId)
        {
            try
            {
                Campaign old = _ctx.Campaigns.Where(c => c.AppUserId == userId).Single(c => c.ID == campaignId);

                Campaign newCampaign = (Campaign)_ctx.Entry(old).CurrentValues.ToObject();
                newCampaign.ID = default;
                newCampaign.Name = newCampaign.Name + " (Copy)";

                _ctx.Campaigns.Add(newCampaign);
                _ctx.SaveChanges();

                var model = _mapper.Map<CampaignListViewModel>(newCampaign);
                return model;
            }
            catch(Exception e)
            {
                _logger.LogError(e.Message);
                return new CampaignListViewModel();
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
