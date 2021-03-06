﻿using System.Collections.Generic;
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
        [ForeignKey("SpellSchoolID")]
        public SpellSchool SpellSchool { get; set; }

        public int CastingTimeID { get; set; }
        [ForeignKey("CastingTimeID")]
        public CastingTime CastingTime { get; set; }

        public int SpellRangeID { get; set; }
        [ForeignKey("SpellRangeID")]
        public SpellRange SpellRange { get; set; }

        public int SpellComponentsID { get; set; }
        [ForeignKey("SpellComponentsID")]
        public SpellComponents SpellComponents { get; set; }

        public int SpellDurationID { get; set; }
        [ForeignKey("SpellDurationID")]
        public SpellDuration SpellDuration { get; set; }

        public int CampaignID { get; set; }
        [ForeignKey("CampaignID")]
        public Campaign Campaign { get; set; }

        public ICollection<MonsterSpell> MonsterSpells { get; set; }
    }
}
