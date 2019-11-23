using AutoMapper;
using Ganymede.Api.Models.Equipment;
using Ganymede.Api.Models.Monster.Actions;
using Ganymede.Api.Models.Monster.BasicStats;
using Ganymede.Api.Models.Monster.OptionalStats;
using Ganymede.Api.Models.Monster.SpecialTraits;
using System.Collections.Generic;
using System.Linq;

namespace Ganymede.Api.Models.Monster
{
    public class MonsterModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public MonsterEnums.Size Size { get; set; }
        public MonsterTypeModel Type { get; set; }
        public List<TagModel> Tags { get; set; }
        public List<AlignmentModel> Alignments { get; set; }
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
                .ForMember(d => d.Campaign, o => o.Ignore())
                .ForMember(d => d.CampaignID, o => o.Ignore())
                .ForMember(d => d.MonsterTypeID, o => o.Ignore())
                .ForMember(d => d.SpecialTraitSetID, o => o.Ignore())
                .ForMember(d => d.ActionSetID, o => o.Ignore())
                .ForMember(d => d.Tags, o => o.Ignore())
                .ForMember(d => d.SpecialTraitSet, o => o.MapFrom(s => s.SpecialTraits))
                .ForMember(d => d.ActionSet, o => o.MapFrom(s => s.Actions))
                .ForMember(d => d.Equipment, o => o.Ignore())
                .ForMember(d => d.Alignments, o => o.Ignore());

            CreateMap<Data.Monsters.Monster, MonsterModel>()
                .ForMember(d => d.Tags, o => o.MapFrom(s => s.Tags.Select(t => t.Tag)))
                .ForMember(d => d.SpecialTraits, o => o.MapFrom(s => s.SpecialTraitSet))
                .ForMember(d => d.Actions, o => o.MapFrom(s => s.ActionSet))
                .ForMember(d => d.Equipment, o => o.MapFrom(s => s.Equipment.Select(e => e.Equipment)))
                .ForMember(d => d.Alignments, o => o.MapFrom(s => s.Alignments.Select(a => a.Alignment)));
        }
    }
}
