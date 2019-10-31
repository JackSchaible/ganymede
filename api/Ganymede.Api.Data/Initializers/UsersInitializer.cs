using Microsoft.AspNetCore.Identity;
using System.Linq;

namespace Ganymede.Api.Data.Initializers
{
    internal class UsersInitializer
    {
        public string Initialize(ApplicationDbContext ctx, UserManager<AppUser> usrMgr)
        {
            string
                email = "jack.schaible@hotmail.com",
                userId;

            if (ctx.Users.Any())
                userId = Queryable.First(ctx.Users, x => x.Email == email).Id;
            else
            {
                usrMgr.CreateAsync(new AppUser { Email = email, UserName = email }, "Testing!23").Wait();
                var usr = usrMgr.FindByEmailAsync(email).Result;
                userId = usr.Id;
            }

            return userId;
        }
    }
}
