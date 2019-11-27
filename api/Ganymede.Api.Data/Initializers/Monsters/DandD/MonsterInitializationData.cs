using Ganymede.Api.Data.Initializers.InitializerData;

namespace Ganymede.Api.Data.Initializers.Monsters.DandD
{
    internal class MonsterInitializationData
    {
        public Campaign PrincesOfTheApocalypse { get; set; }
        public AlignmentData Alignments { get; set; }
        public DiceRollData DiceRolls { get; set; }
        public ArmorData Armors { get; set; }
        public LanguageData Languages { get; set; }
        public SkillData Skills { get; set; }
        public PlayerClassData Classes { get; set; }
        public SpellData Spells { get; set; }
    }
}
