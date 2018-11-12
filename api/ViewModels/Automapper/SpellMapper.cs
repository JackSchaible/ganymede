﻿using System;
using System.Linq;
using api.Entities.Spells;
using api.ViewModels.Models.Spells;
using AutoMapper;

namespace api.ViewModels.Automapper
{
    public class SpellMapper : Profile
    {
        public SpellMapper()
        {
            CreateMap<Spell, SpellModel>()
                .ForMember(d => d.School, o => o.MapFrom(s => (SpellSchools)Enum.ToObject(typeof(SpellSchools), s.SpellSchool)))
                .ForMember(d => d.Classes, o => o.MapFrom(s => GetClasses(s.Classes)))
                .ForMember(d => d.CastingTime, o => o.MapFrom(s => new CastingTime(s.TimeType, s.TimeLength)))
                .ForMember(d => d.Range, o => o.MapFrom(s => new Range(s.RangeType, s.RangeLength)))
                .ForMember(d => d.Components, o => o.MapFrom(s => new Components(s.Verbal, s.Somatic, s.Material)))
                .ForMember(d => d.Duration, o => o.MapFrom(s => new Duration(s.DurationType, s.DurationLength, s.Concentration)));

            CreateMap<SpellModel, Spell>()
                .ForMember(d => d.SpellSchool, o => o.MapFrom(s => (int)(object)s.School))
                .ForMember(d => d.Classes, o => o.MapFrom(s => string.Join(",", s.Classes.Select(x => x.ToString()))))
                .ForMember(d => d.TimeType, o => o.MapFrom(s => s.CastingTime.TimeType))
                .ForMember(d => d.TimeLength, o => o.MapFrom(s => s.CastingTime.Amount))
                .ForMember(d => d.RangeType, o => o.MapFrom(s => s.Range.RangeType))
                .ForMember(d => d.RangeLength, o => o.MapFrom(s => s.Range.Amount))
                .ForMember(d => d.Verbal, o => o.MapFrom(s =>s.Components.Verbal))
                .ForMember(d => d.Somatic, o => o.MapFrom(s =>s.Components.Somatic))
                .ForMember(d => d.Material, o => o.MapFrom(s =>s.Components.Material))
                .ForMember(d => d.DurationType, o => o.MapFrom(s => s.Duration.DurationType))
                .ForMember(d => d.DurationLength, o => o.MapFrom(s => s.Duration.Length));
        }

	    private PlayerClasses[] GetClasses(string s)
	    {
		    return s.Split(",").Select(x => (PlayerClasses)(object)int.Parse(x)).ToArray();

	    }
    }
}
