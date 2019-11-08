using Ganymede.Api.Data.Monsters.OptionalStats;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Monsters
{
    public class MonsterSkillSet
    {
        public int OptionalStatsID { get; set; }
        [ForeignKey("OptionalStatsID")]
        public OptionalStatsSet OptionalStats { get; set; }

        public int SkillID { get; set; }
        [ForeignKey("SkillID")]
        public Skill Skill { get; set; }

        public bool DoubleProficiency { get; set; }
        public int AdditionalModifier { get; set; }
    }
}
