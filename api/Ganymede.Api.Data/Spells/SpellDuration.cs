namespace Ganymede.Api.Data.Spells
{
    public class SpellDuration
    {
        public int ID { get; set; }
        public DurationType Type { get; set; }
        public int Amount { get; set; }
        public string Unit { get; set; }
        public bool Concentration { get; set; }
        public bool UpTo { get; set; }
        public bool UntilDispelled { get; set; }
        public bool UntilTriggered { get; set; }
    }

    public enum DurationType
    {
        Duration,
        Instantaneous,
        Until,
        Special
    }
}
