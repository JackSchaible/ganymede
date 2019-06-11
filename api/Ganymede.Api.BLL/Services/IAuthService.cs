using Ganymede.Api.Data;
using Ganymede.Api.Models.Auth;
using System.Threading.Tasks;

namespace Ganymede.Api.BLL.Services
{
    public interface IAuthService
    {
        LoginResult Login(LoginData model);
        Task<RegisterResult> Register(RegisterData model);
        AppUser GetUserData(string userId);
    }
}
