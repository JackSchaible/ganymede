using System.Collections.Generic;
using Ganymede.Api.Models.Api;
using Ganymede.Api.Models.Campaigns;
using Ganymede.Api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Ganymede.Api.BLL.Services;

namespace api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CampaignController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ICampaignService _service;

        public CampaignController(UserManager<AppUser> userManager, ICampaignService service)
        {
            _userManager = userManager;
            _service = service;
        }

        // GET: api/Campaign
        [HttpGet]
        public IEnumerable<Campaign> Get()
        {
            var user = _userManager.GetUserId(HttpContext.User);
            return _service.GetByUser(user);
        }

        // GET: api/Campaign/5
        [HttpGet("{id}", Name = "Get")]
        public CampaignEditViewModel Get(int id)
        {
            var user = _userManager.GetUserId(HttpContext.User);
            return _service.GetByUserAndId(id, user);
        }

        // POST: api/Campaign
        [HttpPost]
        public ApiResponse Post(Campaign value)
        {
            var user = _userManager.GetUserId(HttpContext.User);
            return _service.Add(value, user);
        }

        // PUT: api/Campaign/5
        [HttpPut]
        public ApiResponse Put(Campaign value)
        {
            var user = _userManager.GetUserId(HttpContext.User);
            return _service.Update(value, user);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public ApiResponse DeleteAsync(int id)
        {
            var user = _userManager.GetUserId(HttpContext.User);
            return _service.Delete(id, user);
        }
    }
}
