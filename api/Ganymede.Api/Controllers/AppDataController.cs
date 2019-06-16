using System.Collections.Generic;
using Ganymede.Api.BLL.Services;
using Ganymede.Api.Models.App;
using Microsoft.AspNetCore.Mvc;

namespace Ganymede.Api.Controllers
{
    [Route("api/[controller]")]
    public class AppDataController : Controller
    {
        private readonly IAppService _service;

        public AppDataController(IAppService service)
        {
            _service = service;
        }

        // GET: api/<controller>
        [HttpGet]
        public App Get()
        {
            return _service.GetAppData();
        }
    }
}
