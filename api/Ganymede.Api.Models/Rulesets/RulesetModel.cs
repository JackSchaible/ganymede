using AutoMapper;
using Ganymede.Api.Data.Rulesets;
using System;

namespace Ganymede.Api.Models.Rulesets
{
    public class RulesetModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Abbrevation { get; set; }
        public DateTime ReleaseDate { get; set; }

        public PublisherModel Publisher { get; set; }
    }

    public class RulesetMapper: Profile
    {
        public RulesetMapper()
        {
            CreateMap<RulesetModel, Ruleset>();
            CreateMap<Ruleset, RulesetModel>();
        }
    }
}
