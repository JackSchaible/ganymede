using Ganymede.Api.Data.Monsters.OptionalStats;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Monsters
{
    public class MonsterSkillSet
    {
        public int OptionalStatsID { get; set; }
        [ForeignKey(nameof(OptionalStatsID))]
        public OptionalStatsSet OptionalStats { get; set; }

        public int SkillID { get; set; }
        [ForeignKey(nameof(SkillID))]
        public Skill Skill { get; set; }

        public bool DoubleProficiency { get; set; }
        public int AdditionalModifier { get; set; }
    }
}
