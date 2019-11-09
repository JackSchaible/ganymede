using AutoMapper;
using Ganymede.Api.Data;

namespace Ganymede.Api.Models.Skills
{
    public class SkillModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Ability { get; set; }
    }

    public class SkillModelMapper : Profile
    {
        public SkillModelMapper()
        {
            CreateMap<SkillModel, Skill>()
                .ForMember(d => d.MonsterSkills, o => o.Ignore());
            CreateMap<Skill, SkillModel>();
        }
    }
}
