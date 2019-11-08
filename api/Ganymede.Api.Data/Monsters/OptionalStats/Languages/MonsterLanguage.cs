using Ganymede.Api.Data.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Monsters.OptionalStats.Languages
{
    public class MonsterLanguage
    {
        public bool Understand { get; set; }
        public bool Speak { get; set; }
        public bool Read { get; set; }
        public bool Write { get; set; }

        public int LanguageID { get; set; }
        [ForeignKey("LanguageID")]
        public Language Language { get; set; }

        public int MonsterLanguageSetID { get; set; }
        [ForeignKey("MonsterLanguageSetID")]
        public MonsterLanguageSet MonsterLanguageSet { get; set; }
    }
}
