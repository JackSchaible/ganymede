using Ganymede.Api.Data.Characters;
using Ganymede.Api.Data.Monsters.SpecialTraits.Spellcasting;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Spells
{
    public class Spell
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Level { get; set; }
        public bool Ritual { get; set; }
        public string Description { get; set; }
        public string AtHigherLevels { get; set; }

        public int SpellSchoolID { get; set; }
        [ForeignKey(nameof(SpellSchoolID))]
        public SpellSchool SpellSchool { get; set; }

        public int SpellRangeID { get; set; }
        [ForeignKey(nameof(SpellRangeID))]
        public SpellRange SpellRange { get; set; }

        public int SpellComponentsID { get; set; }
        [ForeignKey(nameof(SpellComponentsID))]
        public SpellComponents SpellComponents { get; set; }

        public int SpellDurationID { get; set; }
        [ForeignKey(nameof(SpellDurationID))]
        public SpellDuration SpellDuration { get; set; }

        public int? CampaignID { get; set; }
        [ForeignKey(nameof(CampaignID))]
        public Campaign Campaign { get; set; }

        public virtual ICollection<SpellCastingTime> CastingTimes { get; set; }
        public virtual ICollection<ClassSpell> ClassSpells { get; set; }
        public virtual ICollection<InnateSpell> InnateSpells { get; set; }
        public virtual ICollection<SpellcasterSpells> SpellcasterSpells { get; set; }
    }
}
