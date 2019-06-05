using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Ganymede.Api.Data
{
  public class AppUser : IdentityUser
  {
    public ICollection<Campaign> Campaigns { get; set; }
  }
}
