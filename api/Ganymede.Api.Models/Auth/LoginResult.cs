using Ganymede.Api.Data;
using Ganymede.Api.Models.Api;

namespace Ganymede.Api.Models.Auth
{
    public class LoginResult
    {
        public bool Success { get; set; }
        public string Token { get; set; }
        public User User { get; set; }
        public ApiError[] Errors { get; set; }
    }
}
