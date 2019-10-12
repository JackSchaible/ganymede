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

                spell = MapValues(spell);

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

                old = MapValues(old);

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

        private Spell MapValues(Spell item)
        {
            CastingTime time = _ctx.CastingTimes.FirstOrDefault(c => c.Amount == item.CastingTime.Amount && c.Unit == item.CastingTime.Unit && c.ReactionCondition == item.CastingTime.ReactionCondition && c.Type == item.CastingTime.Type);
            if (time != null)
                item.CastingTime = time;

            SpellComponents components = _ctx.SpellComponents.FirstOrDefault(c => Enumerable.SequenceEqual(c.Material, item.SpellComponents.Material) && c.Somatic == item.SpellComponents.Somatic && c.Verbal == item.SpellComponents.Verbal);
            if (components != null)
                item.SpellComponents = components;

            SpellDuration duration = _ctx.SpellDurations.FirstOrDefault(d => d.Amount == item.SpellDuration.Amount && d.Concentration == item.SpellDuration.Concentration && d.Type == item.SpellDuration.Type && d.Unit == item.SpellDuration.Unit && d.UpTo == item.SpellDuration.UpTo);
            if (duration != null)
                item.SpellDuration = duration;

            SpellRange range = _ctx.SpellRanges.FirstOrDefault(r => r.Amount == item.SpellRange.Amount && r.Type == item.SpellRange.Type && r.Shape == item.SpellRange.Shape && r.Unit == item.SpellRange.Unit);
            if (range != null)
                item.SpellRange = range;

            return item;
        }
    }
}
