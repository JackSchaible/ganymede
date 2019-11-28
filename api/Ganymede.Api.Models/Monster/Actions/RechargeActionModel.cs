using AutoMapper;
using Ganymede.Api.Data.Monsters.Actions;

namespace Ganymede.Api.Models.Monster.Actions
{
    public class RechargeActionModel : ActionModel
    {
        public ActionEnums.RechargeConditions RechargesOn { get; set; }
        public int RechargeMin { get; set; }
        public int RechargeMax { get; set; }
    }

    public class RechargeActionModelMapper : Profile
    {
        public RechargeActionModelMapper()
        {
            CreateMap<RechargeActionModel, RechargeAction>()
                .ForMember(d => d.Action, o => o.MapFrom(s => new Action
                {
                    ID = s.ID,
                    Name = s.Name,
                    Description = s.Description
                }));
            CreateMap<RechargeAction, RechargeActionModel>()
                .ForMember(d => d.Name, o => o.MapFrom(s => s.Action.Name))
                .ForMember(d => d.Description, o => o.MapFrom(s => s.Action.Description))
                .ForMember(d => d.Lair, o => o.MapFrom(s => false))
                .ForMember(d => d.Reaction, o => o.MapFrom(s => false));
        }
    }
}
