using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using api.Entities.Spells;

namespace api.Entities
{
  public class AppUser : IdentityUser
  {
    public List<Spell> Spells { get; set; }
  }
}
