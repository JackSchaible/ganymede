using Ganymede.Api.Models.Api;
using System.Collections.Generic;

namespace Ganymede.Api.Models.Auth
{
    public class RegisterResult
    {
        public string Token { get; set; }
        public List<ApiError> Errors { get; set; }
    }
}
