using Ganymede.Api.Models.Skills;

namespace Ganymede.Api.Models.Monster
{
    public class MonsterSkillSetModel
    {
        public MonsterModel Monster { get; set; }
        public SkillModel Skill { get; set; }
        public bool DoubleProficiency { get; set; }
        public int AdditionalModifier { get; set; }
    }
}
