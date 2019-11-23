using AutoMapper;
using Ganymede.Api.Data.Monsters.Actions;
using System.Collections.Generic;

namespace Ganymede.Api.Models.Monster.Actions
{
    public class ActionsSetModel
    {
        public int ID { get; set; }
        public List<ActionModel> Actions { get; set; }
        public string Multiattack { get; set; }
    }

    public class ActionsSetModelMapper : Profile
    {
        public ActionsSetModelMapper()
        {
            CreateMap<ActionsSetModel, ActionsSet>();
            CreateMap<ActionsSet, ActionsSetModel>();
        }
    }
}
