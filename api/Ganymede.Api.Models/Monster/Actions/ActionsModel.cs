using System.Collections.Generic;

namespace Ganymede.Api.Models.Monster.Actions
{
    public class ActionsModel
    {
        public int ID { get; set; }
        public List<ActionModel> Actions { get; set; }
        public string Multiattack { get; set; }
        public List<ActionModel> Reactions { get; set; }
    }
}
