using AutoMapper;
using Ganymede.Api.Data;
using Ganymede.Api.Data.Spells;
using Ganymede.Api.Models.Api;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Ganymede.Api.BLL.Services.Impl
{
    public class SpellService : ISpellService
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
        private readonly ILogger<SpellService> _logger;
        private readonly IMapper _mapper;

        public SpellService(ApplicationDbContext ctx, ILogger<SpellService> logger, IMapper mapper)
        {
            _ctx = ctx;
            _logger = logger;
            _mapper = mapper;
        }

        public ApiResponse Add(Spell spell, int campaignID, string userId)
        {
            try
            {
                Campaign campaign = _ctx.Campaigns.Where(c => c.ID == campaignID && c.AppUserId == userId).Single();
                spell.CampaignID = campaign.ID;
                spell.ID = default;

                _ctx.Spells.Add(spell);
                _ctx.SaveChanges();

                return new ApiResponse
                {
                    StatusCode = ApiCodes.Ok,
                    InsertedID = spell.ID
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

        public ApiResponse Update(Spell spell, string userId)
        {
            try
            {
                Spell old = _ctx.Spells.Where(c => c.Campaign.AppUserId == userId).Single(c => c.ID == spell.ID);
                _mapper.Map(spell, old);

                CastingTime time = _ctx.CastingTimes.FirstOrDefault(c => c.Amount == old.CastingTime.Amount && c.Unit == old.CastingTime.Unit && c.ReactionCondition == old.CastingTime.ReactionCondition);
                if (time != null)
                {
                    old.CastingTime = time;
                    old.CastingTimeID = time.ID;
                }

                SpellComponents components = _ctx.SpellComponents.FirstOrDefault(c => Enumerable.SequenceEqual(c.Material, old.SpellComponents.Material) && c.Somatic == old.SpellComponents.Somatic && c.Verbal == old.SpellComponents.Verbal);
                if (components != null)
                {
                    old.SpellComponents = components;
                    old.SpellComponentsID = components.ID;
                }

                SpellDuration duration = _ctx.SpellDurations.FirstOrDefault(d => d.Amount == old.SpellDuration.Amount && d.Concentration == old.SpellDuration.Concentration && d.Type == old.SpellDuration.Type && d.Unit == old.SpellDuration.Unit && d.UpTo == old.SpellDuration.UpTo);
                if (duration != null)
                {
                    old.SpellDuration = duration;
                    old.SpellDurationID = duration.ID;
                }

                SpellRange range = _ctx.SpellRanges.FirstOrDefault(r => r.Amount == old.SpellRange.Amount && r.Type == old.SpellRange.Type && r.Shape == old.SpellRange.Shape && r.Unit == old.SpellRange.Unit);
                if (range != null)
                {
                    old.SpellRange = range;
                    old.SpellRangeID = range.ID;
                }

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
                _ctx.Spells.Remove(_ctx.Spells.Where(c => c.Campaign.AppUserId == userId).Single(c => c.ID == id));
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
