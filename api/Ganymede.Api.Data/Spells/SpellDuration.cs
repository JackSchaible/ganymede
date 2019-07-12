namespace Ganymede.Api.Data.Spells
{
    public class SpellDuration
    {
        public int ID { get; set; }
        public int Amount { get; set; }
        public string Unit { get; set; }
        public bool Concentration { get; set; }
        public bool Special { get; set; }
        public bool Instantaneous { get; set; }
        public bool UpTo { get; set; }
    }
}
