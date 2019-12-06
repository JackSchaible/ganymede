using Ganymede.Api.Data.Spells;
using System.Collections.Generic;

namespace Ganymede.Api.Data.Characters
{
    public class PlayerClass
    {
        public int ID { get; set; }
        public string Name { get; set; }

        public virtual ICollection<ClassSpell> ClassSpells { get; set; }
    }
}
