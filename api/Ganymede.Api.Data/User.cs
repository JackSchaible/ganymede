using System.Collections.Generic;

namespace Ganymede.Api.Data
{
    public class User
    {
        public string Email { get; set; }
        public ICollection<Campaign> Campaigns { get; set; }
    }
}
