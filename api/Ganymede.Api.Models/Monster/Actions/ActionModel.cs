using AutoMapper;
using Ganymede.Api.Data.Monsters.Actions;

namespace Ganymede.Api.Models.Monster.Actions
{
    public class ActionModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class ActionModelMapper : Profile
    {
        public ActionModelMapper()
        {
            CreateMap<ActionModel, Action>();
            CreateMap<Action, ActionModel>();
        }
    }
}
