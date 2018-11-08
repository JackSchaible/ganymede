using api.Errors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Entities;

namespace api.Controllers
{
	[Route("api/[controller]/[action]")]
	[ApiController]
	public class MonsterController : Controller
	{
		private Dictionary<string, ApiError> _errors = new Dictionary<string, ApiError>
		{
			{ "DuplicateUserName", new ApiError("Username", "NOT_UNIQUE")},
			{ "PasswordRequiresNonAlphanumeric", new ApiError("Password", "NO_SPECIAL_CHAR") },
			{ "PasswordRequiresUpper", new ApiError("Password", "NO_UPPER") },
			{ "PasswordRequiresDigit", new ApiError("Password", "NO_DIGIT") },
			{ "InvalidPassword", new ApiError("Password", "WRONG") },
		};

		private ApplicationDbContext _ctx;

		public MonsterController(ApplicationDbContext ctx)
		{
			_ctx = ctx;
		}

		//[HttpGet]
		//public async Task<object> Get(int id)
		//{
		//	return Json(_ctx.Monsters.FirstOrDefault(x => x.MonsterId == id));
		//}
	}
}
