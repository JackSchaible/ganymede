using Ganymede.Api.BLL.Services;
using Ganymede.Api.Data;
using Ganymede.Api.Models.Api;
using Ganymede.Api.Models.Spells;
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

        // PUT: api/Spell/5
        [HttpPut]
        public ApiResponse Save(SpellModel value)
        {
            var user = _userManager.GetUserId(HttpContext.User);

            ApiResponse response;

            if (value.ID == -1)
                response = _service.Add(value, user);
            else
                response = _service.Update(value, user);

            return response;
        }

        // DELETE: api/Spell/5
        [HttpDelete("{id}")]
        public ApiResponse Delete(int id)
        {
            var user = _userManager.GetUserId(HttpContext.User);
            return _service.Delete(id, user);
        }
    }
}