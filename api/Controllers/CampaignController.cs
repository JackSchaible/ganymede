﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using api.Errors;
using api.ViewModels.Models.Campaigns;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CampaignController : ControllerBase
    {
        private Dictionary<string, ApiError> _errors = new Dictionary<string, ApiError>
        {
            { "NotOwner", new ApiError("Owner", "NOT_OWNER")},
        };

        private readonly ApplicationDbContext _ctx;
        private readonly UserManager<AppUser> _userManager;

        public CampaignController(ApplicationDbContext ctx, UserManager<AppUser> userManager)
        {
            _ctx = ctx;
            _userManager = userManager;
        }

        // GET: api/Campaign
        [HttpGet]
        public IEnumerable<Campaign> Get()
        {
            var user = _userManager.GetUserId(HttpContext.User);
            return _ctx
                .Campaigns
                .Include(c => c.Ruleset)
                .Include(c => c.Ruleset.Publisher)
                .Where(c => c.AppUserId == user);
        }

        // GET: api/Campaign/5
        [HttpGet("{id}", Name = "Get")]
        public CampaignEditViewModel Get(int id)
        {
            var user = _userManager.GetUserId(HttpContext.User);

            return new CampaignEditViewModel
            {
                Campaign = _ctx.Campaigns.Where(c => c.AppUserId == user).Single(c => c.ID == id),
                Rulesets = _ctx.Rulesets.Include(r => r.Publisher).ToList()
            };
        }

        // POST: api/Campaign
        [HttpPost]
        public void Post(Campaign value)
        {
            var user = _userManager.GetUserId(HttpContext.User);
            value.AppUserId = user;

            _ctx.Campaigns.Add(value);
            _ctx.SaveChanges();
        }

        // PUT: api/Campaign/5
        [HttpPut]
        public void Put(Campaign value)
        {
            var user = _userManager.GetUserId(HttpContext.User);
            Campaign old = _ctx.Campaigns.Where(c => c.AppUserId == user).Single(c => c.ID == value.ID);
            old = value;
            _ctx.SaveChanges();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void DeleteAsync(int id)
        {
            var user = _userManager.GetUserId(HttpContext.User);

            _ctx.Campaigns.Remove(_ctx.Campaigns.Where(c => c.AppUserId == user).Single(c => c.ID == id));
            _ctx.SaveChanges();
        }
    }
}
