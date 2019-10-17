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

        public ApiResponse Add(Spell spell, string userId)
        {
            try
            {
                spell.ID = default;

                _ctx.Spells.Add(MapValues(spell, userId));
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

                old = MapValues(old, userId);

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

        private Spell MapValues(Spell spell, string userId)
        {
            CastingTime time = _ctx.CastingTimes.FirstOrDefault(c => c.Amount == spell.CastingTime.Amount && c.Unit == spell.CastingTime.Unit && c.ReactionCondition == spell.CastingTime.ReactionCondition && c.Type == spell.CastingTime.Type);
            if (time != null)
                spell.CastingTime = time;

            SpellComponents components = _ctx.SpellComponents.FirstOrDefault(c => Enumerable.SequenceEqual(c.Material, spell.SpellComponents.Material) && c.Somatic == spell.SpellComponents.Somatic && c.Verbal == spell.SpellComponents.Verbal);
            if (components != null)
                spell.SpellComponents = components;

            SpellDuration duration = _ctx.SpellDurations.FirstOrDefault(d => d.Amount == spell.SpellDuration.Amount && d.Concentration == spell.SpellDuration.Concentration && d.Type == spell.SpellDuration.Type && d.Unit == spell.SpellDuration.Unit && d.UpTo == spell.SpellDuration.UpTo);
            if (duration != null)
                spell.SpellDuration = duration;

            SpellRange range = _ctx.SpellRanges.FirstOrDefault(r => r.Amount == spell.SpellRange.Amount && r.Type == spell.SpellRange.Type && r.Shape == spell.SpellRange.Shape && r.Unit == spell.SpellRange.Unit);
            if (range != null)
                spell.SpellRange = range;

            spell.Campaign = _ctx.Campaigns.Where(c => c.ID == spell.CampaignID && c.AppUserId == userId).Single();

            return spell;
        }
    }
}
