using Ganymede.Api.Data.Monsters;
using System.Collections.Generic;

namespace Ganymede.Api.Data
{
    public class Skill
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Ability { get; set; }

        public virtual ICollection<MonsterSkillSet> MonsterSkills { get; set; }
    }
}
