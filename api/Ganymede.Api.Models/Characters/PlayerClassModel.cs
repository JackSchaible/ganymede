using AutoMapper;
using Ganymede.Api.Data.Characters;

namespace Ganymede.Api.Models.Characters
{
    public class PlayerClassModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }

    public class PlayerClassModelMapper : Profile
    {
        public PlayerClassModelMapper()
        {
            CreateMap<PlayerClassModel, PlayerClass>();
            CreateMap<PlayerClass, PlayerClassModel>();
        }
    }
}
