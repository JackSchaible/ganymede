using Ganymede.Api.Data.Spells;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Monsters
{
    public class Monster
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual BasicStats BasicStats { get; set; }

        public int CampaignID { get; set; }
        [ForeignKey("CampaignID")]
        public Campaign Campaign { get; set; }

        public ICollection<MonsterSpell> MonsterSpells { get; set; }
    }
}
