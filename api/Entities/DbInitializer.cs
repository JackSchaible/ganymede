using api.Entities.Rulesets;
using Api.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Entities
{
	public class DbInitializer : IDbInitializer
	{
		private ApplicationDbContext _ctx;
		private UserManager<AppUser> _usrMgr;

		public DbInitializer(ApplicationDbContext ctx, UserManager<AppUser> usrMgr)
		{
			_ctx = ctx;
			_usrMgr = usrMgr;
		}

		public async Task Initialize()
		{
			string userId;
			var email = "jack.schaible@hotmail.com";

			if (!_ctx.Users.Any())
			{
				var usrResult = await _usrMgr.CreateAsync(new AppUser { Email = email, UserName = email }, "Testing!23");
				var usr = await _usrMgr.FindByEmailAsync(email);
				userId = usr.Id;
			}
			else
				userId = Queryable.First(_ctx.Users, x => x.Email == email).Id;

            Publisher wizards, paizo;

            if (!_ctx.Publishers.Any())
            {
                List<Publisher> publishers = CreatePublishers();
                wizards = publishers[0];
                paizo = publishers[1];
                _ctx.Publishers.AddRange();
            }
            else
            {
                wizards = _ctx.Publishers.Single(p => p.Name == "Wizards of the Coast LLC.");
                paizo = _ctx.Publishers.Single(p => p.Name == "Paizo Inc.");
            }

            Ruleset fifth, pf;
            if (!_ctx.Rulesets.Any())
            {
                List<Ruleset> rulesets = CreateRulesets(wizards, paizo);
                fifth = rulesets[0];
                pf = rulesets[1];

                _ctx.Rulesets.AddRange(rulesets);
            }
            else
            {
                fifth = _ctx.Rulesets.Single(r => r.Abbrevation == "5e");
                pf = _ctx.Rulesets.Single(r => r.Abbrevation == "Pf");
            }

			if (!_ctx.Campaigns.Any())
				_ctx.Campaigns.AddRange(CreateCampaigns(userId, fifth, pf));

			_ctx.SaveChanges();
		}

        private List<Publisher> CreatePublishers()
        {
            return new List<Publisher>
            {
                new Publisher
                {
                    Name = "Wizards of the Coast LLC."
                },
                new Publisher
                {
                    Name = "Paizo Inc."
                }
            };
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
                    PublisherID = wizards.ID,
                    ReleaseDate = new DateTime(2014, 7, 15),
                },
                new Ruleset
                {
                    Abbrevation = "Pf",
                    Name = "Pathfinder Roleplaying Game",
                    Publisher = paizo,
                    PublisherID = paizo.ID,
                    ReleaseDate = new DateTime(2009, 8, 1)
                }
            };
        }

        private List<Campaign> CreateCampaigns(string userId, Ruleset fifth, Ruleset pf)
        {
            return new List<Campaign>
            {
                new Campaign
                {
                    AppUserId = userId,
                    Description = null,
                    Name = "Princes of the Apocalypse",
                    RulesetID = fifth.ID
                },
                new Campaign
                {
                    AppUserId = userId,
                    Description = null,
                    Name = "Rise of the Runelords",
                    RulesetID = pf.ID
                }
            };
        }
	}
}
