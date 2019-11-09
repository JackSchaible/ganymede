using AutoMapper;
using Ganymede.Api.Data.Monsters.OptionalStats;

namespace Ganymede.Api.Models.Monster.OptionalStats
{
    public class SensesModel
    {
        public int ID { get; set; }
        public int Blindsight { get; set; }
        public int Darkvision { get; set; }
        public int Tremorsense { get; set; }
        public int Truesight { get; set; }
    }

    public class SensesModelMapper : Profile
    {
        public SensesModelMapper()
        {
            CreateMap<SensesModel, Senses>();
            CreateMap<Senses, SensesModel>();
        }
    }
}
