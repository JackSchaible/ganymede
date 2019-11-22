using System.Collections.Generic;

namespace Ganymede.Api.Data.Monsters
{
    public class Alignment
    {
        public int AlignmentID { get; set; }
        public int Morals { get; set; }
        public int Ethics { get; set; }

        public virtual ICollection<MonsterAlignment> Monsters { get; set; }
    }
}
