using AutoMapper;
using Ganymede.Api.Data.Monsters.OptionalStats;
using Ganymede.Api.Models.Monster.OptionalStats.Languages;

namespace Ganymede.Api.Models.Monster.OptionalStats
{
    public class OptionalStatsSetModel
    {
        public int ID { get; set; }

        public MonsterSavingThrowSetModel SavingThrows { get; set; }
        public DamageEffectivenessSetModel Effectivenesses { get; set; }
        public SensesModel Senses { get; set; }
        public MonsterLanguageSetModel Languages { get; set; }
        public int CRAdjustment { get; set; }
    }

    public class OptionalStatsSetModelMapper : Profile
    {
        public OptionalStatsSetModelMapper()
        {
            CreateMap<OptionalStatsSetModel, OptionalStatsSet>()
                .ForMember(d => d.MonsterSavingThrowSetID, o => o.Ignore())
                .ForMember(d => d.DamageEffectivenessSetID, o => o.Ignore())
                .ForMember(d => d.MonsterLanguageSetID, o => o.Ignore())
                .ForMember(d => d.Skills, o => o.Ignore());
            CreateMap<OptionalStatsSet, OptionalStatsSetModel>();
        }
    }
}
