﻿namespace Ganymede.Api.Data.Spells
{
    public class SpellDuration
    {
        public int ID { get; set; }
        public int Type { get; set; }
        public int Amount { get; set; }
        public string Unit { get; set; }
        public bool Concentration { get; set; }
        public bool UpTo { get; set; }
        public bool UntilDispelled { get; set; }
        public bool UntilTriggered { get; set; }
    }
}
