using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Monsters
{
    public class MonsterSkillSet
    {
        public int OptionalStatsID { get; set; }
        [ForeignKey("OptionalStatsID")]
        public OptionalStats OptionalStats { get; set; }

        public int SkillID { get; set; }
        [ForeignKey("SkillID")]
        public Skill Skill { get; set; }

        public bool DoubleProficiency { get; set; }
        public int AdditionalModifier { get; set; }
    }
}
