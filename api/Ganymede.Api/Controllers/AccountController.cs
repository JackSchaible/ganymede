using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Ganymede.Api.BLL.Services;
using Ganymede.Api.Models.Auth;
using Microsoft.AspNetCore.Identity;
using Ganymede.Api.Data;
using Microsoft.AspNetCore.Authorization;

namespace api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly IAuthService _service;
        private readonly UserManager<AppUser> _user;

        public AccountController(IAuthService service, UserManager<AppUser> user)
        {
            _service = service;
            _user = user;
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginData data)
        {
            LoginResult model = _service.Login(data);
            return Json(model);
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetUserData()
        {
            var user = _user.GetUserId(HttpContext.User);
            return Json(_service.GetUserData(user));
        }

        [HttpPost]
        public async Task<RegisterResult> Register([FromBody] RegisterData data)
        {
            var model = await _service.Register(data);
            return model;
        }
    }
}
