using System.Collections.Generic;

namespace Ganymede.Api.Data.Monsters.Actions
{
    public class LegendaryActionsSet
    {
        public int ID { get; set; }
        public int LegendaryActionCount { get; set; }
        public string DescriptionOverride { get; set; }

        public virtual ICollection<Action> Actions { get; set; }

        public string RegionalEffects { get; set; }
    }
}
