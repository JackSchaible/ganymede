using Ganymede.Api.Data.Monsters.OptionalStats.Languages;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Monsters.OptionalStats
{
    public class OptionalStatsSet
    {
        public int ID { get; set; }

        public int? MonsterSavingThrowSetID { get; set; }
        [ForeignKey(nameof(MonsterSavingThrowSetID))]
        public MonsterSavingThrowSet SavingThrows { get; set; }

        public int? DamageEffectivenessSetID { get; set; }
        [ForeignKey(nameof(DamageEffectivenessSetID))]
        public DamageEffectivenessSet Effectivenesses { get; set; }

        public virtual ICollection<MonsterSkillSet> Skills { get; set; }

        public int? SensesID { get; set; }
        [ForeignKey(nameof(SensesID))]
        public Senses Senses { get; set; }

        public int? MonsterLanguageSetID { get; set; }
        [ForeignKey(nameof(MonsterLanguageSetID))]
        public MonsterLanguageSet Languages { get; set; }

        public int CRAdjustment { get; set; }
    }
}
