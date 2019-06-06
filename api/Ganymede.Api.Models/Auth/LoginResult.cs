using Ganymede.Api.Models.Api;

namespace Ganymede.Api.Models.Auth
{
    public class LoginResult
    {
        public string Token { get; set; }
        public ApiError Error { get; set; }
    }
}
