using AutoMapper;
using Ganymede.Api.Data.Spells;

namespace Ganymede.Api.Models.Spells
{
    public class SpellModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Level { get; set; }
        public bool Ritual { get; set; }
        public string Description { get; set; }
        public string AtHigherLevels { get; set; }

        public SpellSchoolModel SpellSchool { get; set; }

        public CastingTimeModel CastingTime { get; set; }

        public SpellRangeModel SpellRange { get; set; }

        public SpellComponentsModel SpellComponents { get; set; }

        public SpellDurationModel SpellDuration { get; set; }
    }

    public class SpellMapper : Profile
    {
        public SpellMapper()
        {
            CreateMap<SpellModel, Spell>()
                .ForMember(dest => dest.CampaignID, opt => opt.Ignore())
                .ForMember(dest => dest.Campaign, opt => opt.Ignore())
                .ForMember(dest => dest.MonsterSpells, opt => opt.Ignore());
            CreateMap<Spell, SpellModel>();
        }
    }
}
