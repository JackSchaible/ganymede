using AutoMapper;
using Ganymede.Api.Models.Equipment;
using Ganymede.Api.Models.Monster.Actions;
using Ganymede.Api.Models.Monster.BasicStats;
using Ganymede.Api.Models.Monster.OptionalStats;
using Ganymede.Api.Models.Monster.SpecialTraits;
using Ganymede.Api.Models.Spells;
using System.Collections.Generic;

namespace Ganymede.Api.Models.Monster
{
    public class MonsterModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public MonsterEnums.Size Size { get; set; }
        public MonsterTypeModel Type { get; set; }
        public List<TagModel> Tags { get; set; }
        public AlignmentModel Alignment { get; set; }
        public BasicStatsSetModel BasicStats { get; set; }
        public AbilityScoresModel AbilityScores { get; set; }
        public OptionalStatsSetModel OptionalStats { get; set; }
        public SpecialTraitSetModel SpecialTraits { get; set; }
        public ActionsSetModel Actions { get; set; }
        public List<EquipmentModel> Equipment { get; set; }
        public LegendaryActionsSetModel LegendaryActions { get; set; }
    }

    public class MonsterMapper : Profile
    {
        public MonsterMapper()
        {
            CreateMap<MonsterModel, Data.Monsters.Monster>()
                .ForMember(dest => dest.Campaign, opt => opt.Ignore())
                .ForMember(dest => dest.CampaignID, opt => opt.Ignore());
            CreateMap<Data.Monsters.Monster, MonsterModel>();
        }
    }
}
