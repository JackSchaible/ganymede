using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Monsters
{
    public class MonsterAlignment
    {
        public int AlignmentID { get; set; }
        [ForeignKey(nameof(AlignmentID))]
        public Alignment Alignment { get; set; }

        public int MonsterID { get; set; }
        [ForeignKey(nameof(MonsterID))]
        public Monster Monster { get; set; }
    }
}
