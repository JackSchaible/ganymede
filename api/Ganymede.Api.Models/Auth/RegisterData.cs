using System.ComponentModel.DataAnnotations;

namespace Ganymede.Api.Models.Auth
{
    public class RegisterData
    {
        [Required]
        public string Email { get; set; }

        [Required]
        [StringLength(128, ErrorMessage = "PWD_MIN_LEN", MinimumLength = 6)]
        public string Password { get; set; }
    }
}
