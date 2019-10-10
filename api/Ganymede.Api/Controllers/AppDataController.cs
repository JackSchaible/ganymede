using Ganymede.Api.BLL.Services;
using Ganymede.Api.Models.App;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ganymede.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppDataController : ControllerBase
    {
        private readonly IAppService _service;

        public AppDataController(IAppService service)
        {
            _service = service;
        }

        // GET: api/AppData
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public App Get()
        {
            return _service.GetAppData();
        }
    }
}
