using Ganymede.Api.BLL.Services;
using Ganymede.Api.Data;
using Ganymede.Api.Data.Spells;
using Ganymede.Api.Models.Api;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Ganymede.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SpellController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ISpellService _service;

        public SpellController(UserManager<AppUser> userManager, ISpellService service)
        {
            _userManager = userManager;
            _service = service;
        }
    }
}