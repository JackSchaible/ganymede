using System.Collections.Generic;

namespace Ganymede.Api.Data.Monsters.OptionalStats.Languages
{
    public class MonsterLanguageSet
    {
        public int ID { get; set; }
        public int TelepathyRange { get; set; }
        public int AnyFreeLanguages { get; set; }

        public virtual ICollection<MonsterLanguage> Languages { get; set; }
    }
}
