using Ganymede.Api.Data.Spells;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Characters
{
    public class ClassSpell
    {
        public int PlayerClassID { get; set; }
        [ForeignKey(nameof(PlayerClassID))]
        public PlayerClass Class { get; set; }

        public int SpellID { get; set; }
        [ForeignKey(nameof(SpellID))]
        public Spell Spell { get; set; }
    }
}
