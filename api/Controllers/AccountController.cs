using api.Errors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using api.Entities;

namespace api.Controllers
{
	[Route("api/[controller]/[action]")]
	[ApiController]
	public class AccountController : Controller
	{
		private Dictionary<string, ApiError> _errors = new Dictionary<string, ApiError>
		{
			{ "DuplicateUserName", new ApiError("Username", "NOT_UNIQUE")},
			{ "PasswordRequiresNonAlphanumeric", new ApiError("Password", "NO_SPECIAL_CHAR") },
			{ "PasswordRequiresUpper", new ApiError("Password", "NO_UPPER") },
			{ "PasswordRequiresDigit", new ApiError("Password", "NO_DIGIT") },
			{ "InvalidPassword", new ApiError("Password", "WRONG") },
		};

		private readonly SignInManager<AppUser> _signinManager;
		private readonly UserManager<AppUser> _userManager;
		private readonly IConfiguration _configuration;

		public AccountController(SignInManager<AppUser> signinManager, UserManager<AppUser> userManager, IConfiguration configuration)
		{
			_signinManager = signinManager;
			_userManager = userManager;
			_configuration = configuration;
		}

		[HttpPost]
		public async Task<object> Login([FromBody] LoginData model)
		{
			var result = await _signinManager.PasswordSignInAsync(model.Email, model.Password, false, false);

			if (result.Succeeded)
			{
				var appUser = _userManager.Users.SingleOrDefault(r => r.Email == model.Email);
				return Json(new { token = GenerateJwtToken(model.Email, appUser) });
			}
			else
			{
				if (!result.IsLockedOut && !result.RequiresTwoFactor && !result.IsNotAllowed)
				{
					return Json(new { error = _errors["InvalidPassword"] });
				}
			}

			throw new ApplicationException("INVALID_LOGIN_ATTEMPT");
		}

		[HttpPost]
		public async Task<object> Register([FromBody] RegisterData model)
		{
			var user = new AppUser
			{
				UserName = model.Email,
				Email = model.Email
			};

			var result = await _userManager.CreateAsync(user, model.Password);

			if (result.Succeeded)
			{
				await _signinManager.SignInAsync(user, false);
				return Json(new { token = GenerateJwtToken(model.Email, user) });
			}
			else
			{
				List<ApiError> knownErrors = new List<ApiError>();

				foreach (var err in result.Errors)
				{
					if (_errors.ContainsKey(err.Code))
					{
						knownErrors.Add(_errors[err.Code]);
					}
				}

				if (knownErrors.Count > 0)
				{
					return Json(new { errors = knownErrors });
				}
			}

			throw new ApplicationException("UNKNOWN_ERROR");
		}

		private object GenerateJwtToken(string email, IdentityUser user)
		{
			var claims = new List<Claim>
			{
				new Claim(JwtRegisteredClaimNames.Sub, email),
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
				new Claim(ClaimTypes.NameIdentifier, user.Id)
			};

			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtKey"]));
			var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
			var expires = DateTime.Now.AddDays(Convert.ToDouble(_configuration["JwtExpireDays"]));

			var token = new JwtSecurityToken(
				_configuration["JwtIssuer"],
				_configuration["JwtIssuer"],
				claims,
				expires: expires,
				signingCredentials: creds
			);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}

		public class LoginData
		{
			[Required]
			public string Email { get; set; }

			[Required]
			public string Password { get; set; }
		}

		public class RegisterData
		{
			[Required]
			public string Email { get; set; }

			[Required]
			[StringLength(128, ErrorMessage = "PWD_MIN_LEN", MinimumLength = 6)]
			public string Password { get; set; }
		}
	}
}
