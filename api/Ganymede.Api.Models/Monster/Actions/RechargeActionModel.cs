namespace Ganymede.Api.Models.Monster.Actions
{
    public class RechargeActionModel : ActionModel
    {
        public ActionEnums.RechargeConditions RechargesOn { get; set; }
        public int RechargeMin { get; set; }
    }
}
