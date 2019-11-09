using AutoMapper;
using Ganymede.Api.Data.Monsters;

namespace Ganymede.Api.Models.Monster
{
    public class MonsterTypeModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class MonsterTypeModelMapper : Profile
    {
        public MonsterTypeModelMapper()
        {
            CreateMap<MonsterTypeModel, MonsterType>();
            CreateMap<MonsterType, MonsterTypeModel>();
        }
    }
}
