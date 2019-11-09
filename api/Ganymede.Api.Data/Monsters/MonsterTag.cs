using Ganymede.Api.Data.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Monsters
{
    public class MonsterTag
    {
        public int MonsterID { get; set; }
        [ForeignKey(nameof(MonsterID))]
        public Monster Monster { get; set; }

        public int TagID { get; set; }
        [ForeignKey(nameof(TagID))]
        public Tag Tag { get; set; }
    }
}
