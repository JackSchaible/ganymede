using System;
using System.Linq;
using AutoMapper;
using Ganymede.Api.Data;
using Ganymede.Api.Models.App;
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
                Rulesets = _ctx.Rulesets.Include(r => r.Publisher).ToList()
            };

            return app;
        }
    }
}
