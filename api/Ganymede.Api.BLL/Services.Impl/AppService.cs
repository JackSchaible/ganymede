using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Ganymede.Api.Data;
using Ganymede.Api.Data.Rulesets;
using Ganymede.Api.Data.Spells;
using Ganymede.Api.Models.App;
using Ganymede.Api.Models.App.FormData;
using Ganymede.Api.Models.Rulesets;
using Ganymede.Api.Models.Spells;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Ganymede.Api.BLL.Services.Impl
{
    public class AppService : IAppService
    {
        private readonly ApplicationDbContext _ctx;
        private readonly ILogger<AppService> _logger;
        private readonly IMapper _mapper;

        public AppService(ApplicationDbContext ctx, ILogger<AppService> logger, IMapper mapper)
        {
            _ctx = ctx;
            _logger = logger;
            _mapper = mapper;
        }

        public App GetAppData()
        {
            App app = new App
            {
                Forms = new Forms
                {
                    CampaignFormData = new CampaignFormData
                    {
                        Rulesets = _mapper.Map<List<Ruleset>, List<RulesetModel>>(_ctx.Rulesets.Include(r => r.Publisher).ToList())
                    },
                    SpellFormData = new SpellFormData
                    {
                        Schools = _mapper.Map<List<SpellSchool>, List<SpellSchoolModel>>(_ctx.SpellSchools.ToList()),
                        CastingTimeTypes = _mapper.Map<List<int>, List<Enums.CastingTimeType>>(_ctx.Spells.Select(s => s.CastingTime.Type).Distinct().ToList()),
                        CastingTimeUnits = _ctx.Spells.Where(s => s.CastingTime.Unit != null).Select(s => s.CastingTime.Unit).Distinct().ToList(),
                        RangeShapes = _ctx.Spells.Where(s => s.SpellRange.Shape != null).Select(s => s.SpellRange.Shape).Distinct().ToList(),
                        RangeUnits = _ctx.Spells.Where(s => s.SpellRange.Unit != null).Select(s => s.SpellRange.Unit).Distinct().ToList(),
                        RangeTypes = _mapper.Map<List<int>, List<Enums.RangeType>>(_ctx.Spells.Select(s => s.SpellRange.Type).Distinct().ToList()),
                        DurationUnits = _ctx.Spells.Where(s => s.SpellDuration.Unit != null).Select(s => s.SpellDuration.Unit).Distinct().ToList(),
                        DurationTypes = _mapper.Map<List<int>, List<Enums.DurationType>>(_ctx.Spells.Select(s => s.SpellDuration.Type).Distinct().ToList())
                    }
                }
            };

            return app;
        }
    }
}
