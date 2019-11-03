using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Ganymede.Api.BLL.Services;
using Ganymede.Api.Models.Auth;
using Microsoft.AspNetCore.Identity;
using Ganymede.Api.Data;

namespace Ganymede.api.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AccountController : ControllerBase
    {
        private readonly IAuthService _service;
        private readonly UserManager<AppUser> _user;

        public AccountController(IAuthService service, UserManager<AppUser> user)
        {
            _service = service;
            _user = user;
        }

        [HttpPost]
        public LoginResult Login([FromBody] LoginData data)
        {
            LoginResult model = _service.Login(data);
            return model;
        }

        [HttpPost]
        public async Task<LoginResult> Register([FromBody] RegisterData data)
        {
            var model = await _service.Register(data);
            return model;
        }
    }
}
