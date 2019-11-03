using AutoMapper;
using Ganymede.Api.Models.Spells;
using System.Collections.Generic;

namespace Ganymede.Api.Models.Monster
{
    public class MonsterModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual BasicStatsModel BasicStats { get; set; }

        public List<SpellModel> MonsterSpells { get; set; }
    }

    public class MonsterMapper : Profile
    {
        public MonsterMapper()
        {
            CreateMap<MonsterModel, Data.Monsters.Monster>()
                .ForMember(dest => dest.Campaign, opt => opt.Ignore())
                .ForMember(dest => dest.CampaignID, opt => opt.Ignore())
                .ForMember(dest => dest.MonsterSpells, opt => opt.Ignore());
            CreateMap<Data.Monsters.Monster, MonsterModel>()
                .ForMember(dest => dest.MonsterSpells, opt => opt.Ignore());
        }
    }
}
