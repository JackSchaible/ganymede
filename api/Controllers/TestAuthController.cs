using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
	[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
	[Route("api/[controller]")]
	public class TestAuthController : Controller
	{
		[HttpGet]
		public IActionResult Index()
		{
			return Json(new {Success = "true"});
		}
	}
}