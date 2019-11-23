using AutoMapper;
using Ganymede.Api.Data.Monsters.Actions;

namespace Ganymede.Api.Models.Monster.Actions
{
    public class LegendaryActionModel : ActionModel
    {
        public int ActionCost { get; set; }
    }

    public class LegendaryActionModelMapper : Profile
    {
        public LegendaryActionModelMapper()
        {
            CreateMap<LegendaryActionModel, LegendaryAction>()
                .ForMember(d => d.Action, o => o.MapFrom(s => new Action
                {
                    ID = s.ID,
                    Name = s.Name,
                    Description = s.Description
                }));
            CreateMap<LegendaryAction, LegendaryActionModel>()
                .ForMember(d => d.Name, o => o.MapFrom(s => s.Action.Name))
                .ForMember(d => d.Description, o => o.MapFrom(s => s.Action.Description))
                .ForMember(d => d.Lair, o => o.MapFrom(s => false))
                .ForMember(d => d.Reaction, o => o.MapFrom(s => false));
        }
    }
}
