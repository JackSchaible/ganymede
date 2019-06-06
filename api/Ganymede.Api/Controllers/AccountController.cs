using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Ganymede.Api.BLL.Services;
using Ganymede.Api.Models.Auth;

namespace api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly IAuthService _service;

        public AccountController(IAuthService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<LoginResult> Login([FromBody] LoginData data)
        {
            var model = await _service.Login(data);
            return model;
        }

        [HttpPost]
        public async Task<RegisterResult> Register([FromBody] RegisterData data)
        {
            var model = await _service.Register(data);
            return model;
        }
    }
}
