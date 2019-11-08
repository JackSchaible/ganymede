using Ganymede.Api.Data.Monsters;
using System.Collections.Generic;

namespace Ganymede.Api.Data.Common
{
    public class Tag
    {
        public int ID { get; set; }
        public string Name { get; set; }

        public virtual ICollection<MonsterTag> MonsterTags { get; set; }
    }
}
