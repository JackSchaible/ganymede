using AutoMapper;
using Ganymede.Api.Data.Monsters.Actions;
using System.Collections.Generic;

namespace Ganymede.Api.Models.Monster.Actions
{
    public class LegendaryActionsSetModel
    {
        public int ID { get; set; }
        public int LegendaryActionCount { get; set; }
        public List<ActionModel> Actions { get; set; }
        public string RegionalEffects { get; set; }
        public string DescriptionOverride { get; set; }
    }

    public class LegendaryActionsSetModelMapper : Profile
    {
        public LegendaryActionsSetModelMapper()
        {
            CreateMap<LegendaryActionsSetModel, LegendaryActionsSet>();
            CreateMap<LegendaryActionsSet, LegendaryActionsSetModel>();
        }
    }
}
