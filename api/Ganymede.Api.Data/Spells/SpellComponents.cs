namespace Ganymede.Api.Data.Spells
{
    public class SpellComponents
    {
        public int ID { get; set; }
        public bool Verbal { get; set; }
        public bool Somatic { get; set; }
        public string[] Material { get; set; }
    }
}
