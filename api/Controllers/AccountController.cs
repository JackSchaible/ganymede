﻿using Microsoft.AspNetCore.Identity;
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

namespace api.Controllers
{
	[Route("api/[controller]/[action]")]
	[ApiController]
	public class AccountController : Controller
	{
		private Dictionary<string, string> _errors = new Dictionary<string, string>
		{
			{ "PasswordRequiresNonAlphanumeric", "REG_PWD_NONALPHA" },
			{ "PasswordRequiresUpper", "REG_PWD_NOUPPER" },
			{"PasswordRequiresDigit", "REG_PWD_NODIGIT" }
		};
		private readonly SignInManager<IdentityUser> _signinManager;
		private readonly UserManager<IdentityUser> _userManager;
		private readonly IConfiguration _configuration;

		public AccountController(SignInManager<IdentityUser> signinManager, UserManager<IdentityUser> userManager, IConfiguration configuration)
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
				return GenerateJwtToken(model.Email, appUser);
			}

			throw new ApplicationException("INVALID_LOGIN_ATTEMPT");
		}

		[HttpPost]
		public async Task<object> Register([FromBody] RegisterData model)
		{
			var user = new IdentityUser
			{
				UserName = model.Email,
				Email = model.Email
			};

			var result = await _userManager.CreateAsync(user, model.Password);

			if (result.Succeeded)
			{
				await _signinManager.SignInAsync(user, false);
				return GenerateJwtToken(model.Email, user);
			}
			else
			{
				List<string> knownErrors = new List<string>();

				foreach (var err in result.Errors)
					if (_errors.ContainsKey(err.Code))
						knownErrors.Add(_errors[err.Code]);

				if (knownErrors.Count > 0)
					return Json(new { errors = knownErrors });
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