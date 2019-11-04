using Ganymede.Api.Models.Skills;

namespace Ganymede.Api.Models.Monster
{
    public class MonsterSkillsModel
    {
        public int ID { get; set; }
        public MonsterModel Monster { get; set; }
        public Skill Skill { get; set; }
        public bool DoubleProficiency { get; set; }
        public int AdditionalModifier { get; set; }
    }
}
