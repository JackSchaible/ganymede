using AutoMapper;
using Ganymede.Api.Data;
using Ganymede.Api.Data.Spells;
using Ganymede.Api.Models.Api;
using Ganymede.Api.Models.Spells;
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

        public ApiResponse Add(SpellModel spell, string userId)
        {
            try
            {
                spell.ID = default;

                var newSpell = MapValues(spell, userId);
                _ctx.Spells.Add(newSpell);
                _ctx.SaveChanges();

                return new ApiResponse
                {
                    StatusCode = ApiCodes.Ok,
                    InsertedID = newSpell.ID,
                    ParentID = newSpell.CampaignID
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

        public ApiResponse Update(SpellModel spell, string userId)
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
                var spell = _ctx.Spells.Where(c => c.Campaign.AppUserId == userId).Single(c => c.ID == id);

                _ctx.MonsterSpells.RemoveRange(_ctx.MonsterSpells.Where(x => x.SpellID == spell.ID));
                _ctx.Spells.Remove(spell);
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

        private Spell MapValues(SpellModel spellModel, string userId)
        {
            var spell = _mapper.Map<SpellModel, Spell>(spellModel);

            return MapValues(spell, userId);
        }

        private Spell MapValues(Spell spell, string userId)
        {
            CastingTime time = _ctx.CastingTimes.FirstOrDefault(c => c.Amount == spell.CastingTime.Amount && c.Unit == spell.CastingTime.Unit && c.ReactionCondition == spell.CastingTime.ReactionCondition && c.Type == (int)spell.CastingTime.Type);
            if (time != null)
            {
                spell.CastingTime = time;
                spell.CastingTimeID = time.ID;
            }

            SpellComponents components = _ctx.SpellComponents.FirstOrDefault(c => c.Somatic == spell.SpellComponents.Somatic && c.Verbal == spell.SpellComponents.Verbal && spell.SpellComponents.Material == c.Material);
            if (components != null)
            {
                spell.SpellComponents = components;
                spell.SpellComponentsID = components.ID;
            }

            SpellDuration duration = _ctx.SpellDurations.FirstOrDefault(d => d.Amount == spell.SpellDuration.Amount && d.Concentration == spell.SpellDuration.Concentration && d.Type == spell.SpellDuration.Type && d.Unit == spell.SpellDuration.Unit && d.UpTo == spell.SpellDuration.UpTo);
            if (duration != null)
            {
                spell.SpellDuration = duration;
                spell.SpellDurationID = duration.ID;
            }

            SpellRange range = _ctx.SpellRanges.FirstOrDefault(r => r.Amount == spell.SpellRange.Amount && r.Type == spell.SpellRange.Type && r.Shape == spell.SpellRange.Shape && r.Unit == spell.SpellRange.Unit);
            if (range != null)
            {
                spell.SpellRange = range;
                spell.SpellRangeID = range.ID;
            }

            spell.Campaign = _ctx.Campaigns.Where(c => c.ID == spell.CampaignID && c.AppUserId == userId).Single();
            spell.CampaignID = spell.Campaign.ID;

            return spell;
        }
    }
}
