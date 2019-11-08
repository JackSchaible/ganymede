using Ganymede.Api.Data.Monsters.OptionalStats.Languages;
using System.Collections.Generic;

namespace Ganymede.Api.Data.Common
{
    public class Language
    {
        public int ID { get; set; }
        public string Name { get; set; }

        public virtual ICollection<MonsterLanguage> MonsterLanguages { get; set; }
    }
}
