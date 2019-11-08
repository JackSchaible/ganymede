using System.Collections.Generic;

namespace Ganymede.Api.Models.Monster.OptionalStats.Languages
{
    public class MonsterLanguageSetModel
    {
        public int ID { get; set; }
        public List<MonsterLanguageModel> Languages { get; set; }
        public int TelepathyRange { get; set; }
        public int AnyFreeLanguages { get; set; }
    }
}
