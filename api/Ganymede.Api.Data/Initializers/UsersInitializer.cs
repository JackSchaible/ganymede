using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading.Tasks;

namespace Ganymede.Api.Data.Initializers
{
    internal class UsersInitializer
    {
        public async Task<string> Initialize(ApplicationDbContext ctx, UserManager<AppUser> usrMgr)
        {
            string
                email = "jack.schaible@hotmail.com",
                userId;

            if (ctx.Users.Any())
                userId = Queryable.First(ctx.Users, x => x.Email == email).Id;
            else
            {
                await usrMgr.CreateAsync(new AppUser { Email = email, UserName = email }, "Testing!23");
                var usr = await usrMgr.FindByEmailAsync(email);
                userId = usr.Id;
            }

            return userId;
        }
    }
}
