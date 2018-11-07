namespace api.ViewModels.Models.Spells
{
    public class SpellModel
    {
        public int SpellID { get; set; }
        public string Name { get; set; }
        public int Level { get; set; }
        public SpellSchools SpellSchool { get; set; }
        public PlayerClasses[] Classes { get; set; }
        public CastingTime CastingTime { get; set; }
        public Range Range { get; set; }
        public Components Components { get; set; }
        public Duration SpellDuration { get; set; }
        public string Description { get; set; }
        public string AtHigherLevels { get; set; }
    }
}
