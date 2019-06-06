using AutoMapper;
using Ganymede.Api.Data.Rulesets;
using Ganymede.Api.Models.Rulesets;

namespace Ganymede.Api.Models.Automapper.Rulesets
{
    public class RulesetMapper: Profile
    {
        public RulesetMapper() => CreateMap<Ruleset, RulesetViewModel>();
    }
}
