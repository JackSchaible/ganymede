using AutoMapper;
using Ganymede.Api.Data.Monsters.Actions;

namespace Ganymede.Api.Models.Monster.Actions
{
    public class PerDayActionModel : ActionModel
    {
        public int NumberPerDay { get; set; }
    }

    public class PerDayActionModelMapper : Profile
    {
        public PerDayActionModelMapper()
        {
            CreateMap<PerDayActionModel, PerDayAction>()
                .ForMember(d => d.Action, o => o.MapFrom(s => new Action
                {
                    ID = s.ID,
                    Name = s.Name,
                    Description = s.Description
                }));
            CreateMap<PerDayAction, PerDayActionModel>()
                .ForMember(d => d.Name, o => o.MapFrom(s => s.Action.Name))
                .ForMember(d => d.Description, o => o.MapFrom(s => s.Action.Description))
                .ForMember(d => d.Lair, o => o.MapFrom(s => false))
                .ForMember(d => d.Reaction, o => o.MapFrom(s => false));
        }
    }
}
