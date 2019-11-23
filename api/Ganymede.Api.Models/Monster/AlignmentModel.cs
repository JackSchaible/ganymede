using AutoMapper;
using Ganymede.Api.Data.Monsters;

namespace Ganymede.Api.Models.Monster
{
    public class AlignmentModel
    {
        public int AlignmentID { get; set; }
        public MonsterEnums.Morals Morals { get; set; }
        public MonsterEnums.Ethics Ethics { get; set; }
    }

    public class AlignmentModelMapper : Profile
    {
        public AlignmentModelMapper()
        {
            CreateMap<AlignmentModel, Alignment>()
                .ForMember(d => d.Monsters, o => o.Ignore());
            CreateMap<Alignment, AlignmentModel>();
        }
    }
}
