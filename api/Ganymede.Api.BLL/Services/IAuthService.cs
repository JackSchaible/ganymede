using Ganymede.Api.Models.Auth;
using System.Threading.Tasks;

namespace Ganymede.Api.BLL.Services
{
    public interface IAuthService
    {
        Task<LoginResult> Login(LoginData model);
        Task<RegisterResult> Register(RegisterData model);
    }
}
