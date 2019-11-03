using Ganymede.Api.Data.Rulesets;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Ganymede.Api.Data.Initializers
{
    internal class RulesetsInitializer
    {
        public void Initialize(ApplicationDbContext ctx, Publisher wizards, Publisher paizo, out Ruleset fifth, out Ruleset pf)
        {
            if (ctx.Rulesets.Any())
            {
                fifth = ctx.Rulesets.Single(r => r.Abbrevation == "5e");
                pf = ctx.Rulesets.Single(r => r.Abbrevation == "Pf");
            }
            else
            {
                List<Ruleset> rulesets = CreateRulesets(wizards, paizo);
                fifth = rulesets[0];
                pf = rulesets[1];

                ctx.Rulesets.AddRange(rulesets);
            }
        }

        private List<Ruleset> CreateRulesets(Publisher wizards, Publisher paizo)
        {
            return new List<Ruleset>
            {
                new Ruleset
                {
                    Abbrevation = "5e",
                    Name = "Dungeons & Dragons 5th Edition",
                    Publisher = wizards,
                    ReleaseDate = new DateTime(2014, 7, 15),
                },
                new Ruleset
                {
                    Abbrevation = "Pf",
                    Name = "Pathfinder Roleplaying Game",
                    Publisher = paizo,
                    ReleaseDate = new DateTime(2009, 8, 1)
                }
            };
        }
    }
}
