using Ganymede.Api.Models.Auth;
using System.Threading.Tasks;

namespace Ganymede.Api.Services.Interfaces
{
    public interface IAuthService
    {
        LoginResult Login(LoginData model);
        Task<LoginResult> Register(RegisterData model);
    }
}
