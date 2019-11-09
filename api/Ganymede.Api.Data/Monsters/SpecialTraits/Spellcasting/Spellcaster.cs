using Ganymede.Api.Data.Characters;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace Ganymede.Api.Data.Monsters.SpecialTraits.Spellcasting
{
    public class Spellcaster
    {
        [ForeignKey(nameof(Spellcasting))]
        public int ID { get; set; }
        public MonsterSpellcasting Spellcasting { get; set; }
        public PlayerClass SpellcastingClass { get; set; }
        public int SpellcasterLevel { get; set; }

        public string DatabaseSpellsPerDay { get; set; }
        [NotMapped]
        public int[] SpellsPerDay 
        {
            get => DatabaseSpellsPerDay.Split(',').Select(i => int.Parse(i)).ToArray();
            set => DatabaseSpellsPerDay = string.Join(',', value);
        }

        public virtual ICollection<SpellcasterSpells> PreparedSpells { get; set; }
    }
}
