﻿using System.Collections.Generic;
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
    [Route("api/[controller]/[action]")]
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
        public IEnumerable<CampaignListViewModel> List()
        {
            var user = _userManager.GetUserId(HttpContext.User);
            return _service.ListByUser(user);
        }

        // GET: api/Campaign/5
        [HttpGet("{id}", Name = "Get")]
        public CampaignEditViewModel Get(int id)
        {
            var user = _userManager.GetUserId(HttpContext.User);
            return _service.GetByUserAndId(id, user);
        }

        // GET: api/Campaign/Clone/5
        [HttpGet("{id}", Name = "Clone")]
        public CampaignListViewModel Clone(int id)
        {
            var user = _userManager.GetUserId(HttpContext.User);
            return _service.Clone(id, user);
        }

        // PUT: api/Campaign/5
        [HttpPut]
        public ApiResponse Save(CampaignEditModel value)
        {
            var user = _userManager.GetUserId(HttpContext.User);

            ApiResponse response;

            if (value.ID == -1)
                response = _service.Add(value, user);
            else
                response = _service.Update(value, user);

            return response;
        }

        // DELETE: api/Campaign/5
        [HttpDelete("{id}")]
        public ApiResponse Delete(int id)
        {
            var user = _userManager.GetUserId(HttpContext.User);
            return _service.Delete(id, user);
        }
    }
}
