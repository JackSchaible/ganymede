using AutoMapper;
using Ganymede.Api.Data.Monsters;
using Ganymede.Api.Models.Monster.OptionalStats;
using Ganymede.Api.Models.Skills;

namespace Ganymede.Api.Models.Monster
{
    public class MonsterSkillSetModel
    {
        public OptionalStatsSetModel OptionalStats { get; set; }
        public SkillModel Skill { get; set; }
        public bool DoubleProficiency { get; set; }
        public int AdditionalModifier { get; set; }
    }

    public class MonsterSkillSetModelMapper : Profile
    {
        public MonsterSkillSetModelMapper()
        {
            CreateMap<MonsterSkillSetModel, MonsterSkillSet>()
                .ForMember(d => d.OptionalStatsID, o => o.Ignore());
            CreateMap<MonsterSkillSet, MonsterSkillSetModel>();
        }
    }
}
