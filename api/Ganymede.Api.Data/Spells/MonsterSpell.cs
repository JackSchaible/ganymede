using Ganymede.Api.Data.Monsters;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Spells
{
    public class MonsterSpell
    {
        public int MonsterID { get; set; }
        [ForeignKey("MonsterID")]
        public Monster Monster { get; set; }

        public int SpellID { get; set; }
        [ForeignKey("SpellID")]
        public Spell Spell { get; set; }
    }
}
