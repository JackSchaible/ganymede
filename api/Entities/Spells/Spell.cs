using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace api.Entities.Spells
{
	public class Spell
	{
		public int SpellID { get; set; }
		public string Name { get; set; }
		public int Level { get; set; }

		[NotMapped]
		public SpellSchools SpellSchool { get; set; }

		[NotMapped]
		public PlayerClasses[] Classes
        {
            get => _classes.Split(",").Select(x => (PlayerClasses)Enum.ToObject(typeof(PlayerClasses), int.Parse(x))).ToArray();
            set => _classes = string.Join(",", value.Select(x => (int)(object)x));
        }
        private string _classes;

		public CastingTime CastingTime { get; set; }
		public Range Range { get; set; }
		public Components Components { get; set; }
		public Duration SpellDuration { get; set; }
		public string Description { get; set; }
		public string AtHigherLevels { get; set; }

		public string AppUserId { get; set; }
		[ForeignKey("AppUserId")]
		public AppUser User { get; set; }
	}
}
