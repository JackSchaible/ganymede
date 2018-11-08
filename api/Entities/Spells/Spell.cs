using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace api.Entities.Spells
{
    public class Spell
    {
        public int SpellID { get; set; }
        public string Name { get; set; }
        public int Level { get; set; }
        public int SpellSchool { get; set; }
        public string Classes { get; set; }
        public string TimeType { get; set; }
        public string TimeLength { get; set; }
        public string RangeType { get; set; }
        public string RangeLength { get; set; }
        public bool Verbal { get; set; }
        public bool Somatic { get; set; }
        public string Material { get; set; }
        public string DurationType { get; set; }
        public string DurationLength { get; set; }
        public bool Concentration { get; set; }
        public string Description { get; set; }
        public string AtHigherLevels { get; set; }

        public string AppUserId { get; set; }
        [ForeignKey("AppUserId")]
        public AppUser User { get; set; }
    }
}
