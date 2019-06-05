using System.ComponentModel.DataAnnotations;

namespace Ganymede.Api.Models.Auth
{
    public class LoginData
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
