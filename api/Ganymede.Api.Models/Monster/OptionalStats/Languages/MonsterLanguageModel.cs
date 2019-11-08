using Ganymede.Api.Models.Common;

namespace Ganymede.Api.Models.Monster.OptionalStats.Languages
{
    public class MonsterLanguageModel
    {
        public LanguageModel Language { get; set; }
        public bool Understand { get; set; }
        public bool Speak { get; set; }
        public bool Read { get; set; }
        public bool Write { get; set; }
    }
}
