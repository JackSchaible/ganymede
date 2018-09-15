using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace api.Entities
{
  public class AppUser : IdentityUser
  {
    public List<EncounterGroup> EncounterGroups { get; set; }
  }
}
