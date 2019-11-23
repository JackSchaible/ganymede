using System.Collections.Generic;

namespace Ganymede.Api.Data.Monsters.Actions
{
    public class ActionsSet
    {
        public int ID { get; set; }
        public virtual ICollection<Action> Actions { get; set; }
        public string Multiattack { get; set; }
    }
}
