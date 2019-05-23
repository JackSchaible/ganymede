using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace api.Entities
{
  public class AppUser : IdentityUser
  {
    public ICollection<Campaign> Campaigns { get; set; }
  }
}
