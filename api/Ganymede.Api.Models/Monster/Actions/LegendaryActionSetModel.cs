using System.Collections.Generic;

namespace Ganymede.Api.Models.Monster.Actions
{
    public class LegendaryActionsSetModel
    {
        public int ID { get; set; }
        public int LegendaryActionCount { get; set; }
        public List<LegendaryActionModel> Actions { get; set; }
        public List<ActionModel> LairActions { get; set; }
        public List<string> RegionalEffects { get; set; }
    }
}
