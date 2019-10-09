using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Ganymede.Api.Data;
using Ganymede.Api.Models.App;
using Ganymede.Api.Models.App.FormData;
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
                        Rulesets = _ctx.Rulesets.Include(r => r.Publisher).ToList()
                    },
                    SpellFormData = new SpellFormData
                    {
                        Schools = _ctx.SpellSchools.ToList(),
                        CastingTimeTypes = _ctx.Spells.Select(s => s.CastingTime.Type).Distinct().ToList(),
                        CastingTimeUnits = _ctx.Spells.Where(s => s.CastingTime.Unit != null).Select(s => s.CastingTime.Unit).Distinct().ToList(),
                        RangeShapes = _ctx.Spells.Where(s => s.SpellRange.Shape != null).Select(s => s.SpellRange.Shape).Distinct().ToList(),
                        RangeUnits = _ctx.Spells.Where(s => s.SpellRange.Unit != null).Select(s => s.SpellRange.Unit).Distinct().ToList(),
                        RangeTypes = _ctx.Spells.Select(s => s.SpellRange.Type).Distinct().ToList(),
                        Durations = _ctx.Spells.Where(s => s.SpellDuration.Unit != null).Select(s => s.SpellDuration.Unit).Distinct().ToList(),
                        DurationTypes = _ctx.Spells.Select(s => s.SpellDuration.Type).Distinct().ToList()
                    }
                }
            };

            return app;
        }
    }
}
