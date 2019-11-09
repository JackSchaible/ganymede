using Ganymede.Api.Data.Monsters;
using Ganymede.Api.Data.Rulesets;
using System.Collections.Generic;
using System.Linq;

namespace Ganymede.Api.Data.Initializers
{
    internal class CampaignsInitializer
    {
        public void Initialize(ApplicationDbContext ctx, string userId, Ruleset fifth, Ruleset pf, out Campaign pota)
        {
            if (ctx.Campaigns.Any())
            {
                pota = ctx.Campaigns.Single(c => c.Name == "Princes of the Apocalypse");
            }
            else
            {
                List<Campaign> campaigns = CreateCampaigns(userId, fifth, pf);
                pota = campaigns.Single(c => c.Name == "Princes of the Apocalypse");

                ctx.Campaigns.AddRange(campaigns);
            }
        }

        private List<Campaign> CreateCampaigns(string userId, Ruleset fifth, Ruleset pf)
        {
            return new List<Campaign>
            {
                new Campaign
                {
                    AppUserId = userId,
                    Description = "Called by the Elder Elemental Eye to serve, four corrupt prophets have risen from the depths of anonymity to claim mighty weapons with direct links to the power of the elemental princes. Each of these prophets has assembled a cadre of cultists and creatures to serve them in the construction of four elemental temples of lethal design. It is up to adventurers from heroic factions such as the Emerald Enclave and the Order of the Gauntlet to discover where the true power of each prophet lay, and dismantle it before it comes boiling up to obliterate the Realms.",
                    Name = "Princes of the Apocalypse",
                    Ruleset = fifth,
                },
                new Campaign
                {
                    AppUserId = userId,
                    Description = "From the idyllically peaceful coastal town of Sandpoint to an ancient lost city at the top of the world, Rise of the Runelords takes a party of adventurers from 1st to over 18th level and delves into the mysteries of Varisia's ancient past. Millennia ago, the powerful empire of Thassilon ruled the land, dominated by despotic runelords who maintained their power through harnessing the power of rune magic. Thought gone forever, the workings of Thassilon are not so far beneath the surface and one of the runelords plans a return to power. Only the brave adventurers stand in his way.",
                    Name = "Rise of the Runelords",
                    Ruleset = pf,
                }
            };
        }
    }
}
