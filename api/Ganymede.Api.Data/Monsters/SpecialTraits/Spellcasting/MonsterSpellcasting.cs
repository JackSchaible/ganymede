namespace Ganymede.Api.Data.Monsters.SpecialTraits.Spellcasting
{
    public abstract class MonsterSpellcasting
    {
        public int ID { get; set; }
        public bool Psionic { get; set; }
        public string SpellcastingAbility { get; set; }
        public int SpellcastingType { get; set; }
    }
}
