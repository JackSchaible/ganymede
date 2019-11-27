using Ganymede.Api.Data.Monsters.Actions;
using Ganymede.Api.Data.Monsters.SpecialTraits;
using Ganymede.Api.Data.Monsters.OptionalStats;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Ganymede.Api.Data.Monsters.BasicStats;

namespace Ganymede.Api.Data.Monsters
{
    public class Monster
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Size { get; set; }

        public virtual ICollection<MonsterTag> Tags { get; set; }
        public virtual ICollection<MonsterAlignment> Alignments { get; set; }
        public virtual ICollection<MonsterEquipment> Equipment { get; set; }

        public int MonsterTypeID { get; set; }
        [ForeignKey(nameof(MonsterTypeID))]
        public MonsterType Type { get; set; }

        public int BasicStatsID { get; set; }
        [ForeignKey(nameof(BasicStatsID))]
        public BasicStatsSet BasicStats { get; set; }

        public int AbilityScoresID { get; set; }
        [ForeignKey(nameof(AbilityScoresID))]
        public AbilityScores AbilityScores { get; set; }

        public int? OptionalStatsID { get; set; }
        [ForeignKey(nameof(OptionalStatsID))]
        public OptionalStatsSet OptionalStats { get; set; }

        public int? SpecialTraitSetID { get; set; }
        [ForeignKey(nameof(SpecialTraitSetID))]
        public SpecialTraitsSet SpecialTraitSet { get; set; }

        public int? ActionSetID { get; set; }
        [ForeignKey(nameof(ActionSetID))]
        public ActionsSet ActionSet { get; set; }

        public int? LegendaryActionsID { get; set; }
        [ForeignKey(nameof(LegendaryActionsID))]
        public LegendaryActionsSet LegendaryActions { get; set; }

        public int CampaignID { get; set; }
        [ForeignKey(nameof(CampaignID))]
        public virtual Campaign Campaign { get; set; }
    }
}
