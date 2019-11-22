using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace Ganymede.Api.Data.Monsters.Actions
{
    public class LegendaryActionsSet
    {
        public int ID { get; set; }
        public int LegendaryActionCount { get; set; }
        public string DescriptionOverride { get; set; }

        public virtual ICollection<LegendaryAction> Actions { get; set; }
        public virtual ICollection<Action> LairActions { get; set; }

        public string DatabaseRegionalEffects { get; set; }
        [NotMapped]
        public string[] RegionalEffects
        {
            get => DatabaseRegionalEffects.Split("%2A");
            set => DatabaseRegionalEffects = string.Join("%2A", value.Select(p => p.ToString()).ToArray());
        }
    }
}
