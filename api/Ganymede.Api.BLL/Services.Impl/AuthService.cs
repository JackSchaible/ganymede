﻿using Ganymede.Api.Data;
using Ganymede.Api.Models.Api;
using Ganymede.Api.Models.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Ganymede.Api.BLL.Services.Impl
{
    public class AuthService: IAuthService
    {
        private Dictionary<string, ApiError> _errors = new Dictionary<string, ApiError>
        {
            { "DuplicateUserName", new ApiError { Field = "Username", ErrorCode = "NOT_UNIQUE"}},
            { "PasswordRequiresNonAlphanumeric", new ApiError { Field = "Password", ErrorCode = "NO_SPECIAL_CHAR"}},
            { "PasswordRequiresUpper", new ApiError { Field = "Password", ErrorCode = "NO_UPPER" }},
            { "PasswordRequiresDigit", new ApiError { Field = "Password", ErrorCode = "NO_DIGIT" }},
            { "InvalidPassword", new ApiError { Field = "Password", ErrorCode = "WRONG" }},
        };

        private readonly SignInManager<AppUser> _signinManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthService> _logger;

        public AuthService(SignInManager<AppUser> signinManager, UserManager<AppUser> userManager, IConfiguration configuration, ILogger<AuthService> logger)
        {
            _signinManager = signinManager;
            _userManager = userManager;
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<LoginResult> Login(LoginData model)
        {
            var result = new LoginResult();
            var signinResult = await _signinManager.PasswordSignInAsync(model.Email, model.Password, false, false);

            if (signinResult.Succeeded)
            {
                var appUser = _userManager.Users.SingleOrDefault(r => r.Email == model.Email);
                result.Token = GenerateJwtToken(model.Email, appUser);
            }
            else if (!signinResult.IsLockedOut && !signinResult.RequiresTwoFactor && !signinResult.IsNotAllowed)
            {
                result.Error = new ApiError
                {
                    Field = _errors["InvalidPassword"].Field,
                    ErrorCode = _errors["InvalidPassword"].ErrorCode
                };
            }
            else
                throw new ApplicationException("INVALID_LOGIN_ATTEMPT");

            return result;
        }

        public async Task<RegisterResult> Register(RegisterData model)
        {
            var result = new RegisterResult();

            var user = new AppUser
            {
                UserName = model.Email,
                Email = model.Email
            };

            var createResult = await _userManager.CreateAsync(user, model.Password);

            if (createResult.Succeeded)
            {
                await _signinManager.SignInAsync(user, false);
                result.Token = GenerateJwtToken(model.Email, user);
                return result;
            }
            else
            {
                List<ApiError> knownErrors = new List<ApiError>();

                foreach (var err in createResult.Errors)
                {
                    if (_errors.ContainsKey(err.Code))
                    {
                        knownErrors.Add(_errors[err.Code]);
                    }
                }

                if (knownErrors.Count > 0)
                {
                    result.Errors = knownErrors;
                    return result;
                }
            }

            _logger.LogError("Unknown error(s)", result.Errors);
            throw new ApplicationException("UNKNOWN_ERROR");
        }

        private string GenerateJwtToken(string email, IdentityUser user)
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
    }
}
