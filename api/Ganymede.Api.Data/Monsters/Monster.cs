using Ganymede.Api.Data.Monsters.BasicStats;
using Ganymede.Api.Data.Monsters.OptionalStats;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Monsters
{
    public class Monster
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Size { get; set; }

        public virtual ICollection<MonsterTag> Tags { get; set; }

        public int MonsterTypeID { get; set; }
        [ForeignKey("MonsterTypeID")]
        public MonsterType Type { get; set; }

        public int AlignmentID { get; set; }
        [ForeignKey("AlignmentID")]
        public Alignment Alignment { get; set; }

        public int BasicStatsID { get; set; }
        [ForeignKey("BasicStatsID")]
        public BasicStatsModel BasicStats { get; set; }

        public int AbilityScoresID { get; set; }
        [ForeignKey("AbilityScoresID")]
        public AbilityScores AbilityScores { get; set; }

        public int OptionalStatsID { get; set; }
        [ForeignKey("OptionalStatsID")]
        public OptionalStatsSet OptionalStats { get; set; }




        public SpecialTraitsModel SpecialTraits { get; set; }
        public ActionsModel Actions { get; set; }
        public List<EquipmentModel> Equipment { get; set; }
        public LegendaryActionsModel LegendaryActions { get; set; }
    }
}
