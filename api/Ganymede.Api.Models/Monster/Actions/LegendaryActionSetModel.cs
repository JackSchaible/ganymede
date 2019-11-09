using AutoMapper;
using Ganymede.Api.Data.Monsters.Actions;
using System.Collections.Generic;

namespace Ganymede.Api.Models.Monster.Actions
{
    public class LegendaryActionsSetModel
    {
        public int ID { get; set; }
        public int LegendaryActionCount { get; set; }
        public List<LegendaryActionModel> Actions { get; set; }
        public List<ActionModel> LairActions { get; set; }
        public List<string> RegionalEffects { get; set; }
    }

    public class LegendaryActionsSetModelMapper : Profile
    {
        public LegendaryActionsSetModelMapper()
        {
            CreateMap<LegendaryActionsSetModel, LegendaryActionsSet>()
                .ForMember(d => d.DatabaseRegionalEffects, o => o.Ignore());
            CreateMap<LegendaryActionsSet, LegendaryActionsSetModel>();
        }
    }
}
