using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Monsters.Actions
{
    public class RechargeAction
    {
        [ForeignKey(nameof(Action))]
        public int ID { get; set; }
        public Action Action { get; set; }


        public int RechargesOn { get; set; }
        public int RechargeMin { get; set; }
    }
}
