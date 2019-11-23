using AutoMapper;
using Ganymede.Api.Data.Monsters.Actions;
using System.Collections.Generic;

namespace Ganymede.Api.Models.Monster.Actions
{
    public class AttackModel : ActionModel
    {
        public ActionEnums.AttackTypes Type { get; set; }
        public int RangeMin { get; set; }
        public int RangeMax { get; set; }
        public ActionEnums.TargetTypes Target { get; set; }
        public bool ExtraGrappleRoll { get; set; }
        public List<HitEffectModel> HitEffects { get; set; }
        public string Miss { get; set; }
    }

    public class AttackModelMapper : Profile
    {
        public AttackModelMapper()
        {
            CreateMap<AttackModel, Attack>()
                .ForMember(d => d.Action, o => o.MapFrom(s => new Action
                {
                    ID = s.ID,
                    Name = s.Name,
                    Description = s.Description
                }));
            CreateMap<Attack, AttackModel>()
                .ForMember(d => d.Name, o => o.MapFrom(s => s.Action.Name))
                .ForMember(d => d.Description, o => o.MapFrom(s => s.Action.Description))
                .ForMember(d => d.Lair, o => o.MapFrom(s => false))
                .ForMember(d => d.Reaction, o => o.MapFrom(s => false));
        }
    }
}
