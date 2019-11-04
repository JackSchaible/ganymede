using System.Collections.Generic;

namespace Ganymede.Api.Models.Monster.Actions
{
    public class AttackModel : ActionModel
    {
        public ActionEnums.AttackTypes Type { get; set; }
        public int Range { get; set; }
        public ActionEnums.TargetTypes Target { get; set; }
        public List<HitEffectModel> HitEffects { get; set; }
        public string Miss { get; set; }
    }
}
