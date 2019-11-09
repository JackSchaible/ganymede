using Ganymede.Api.Data.Monsters;
using System.Collections.Generic;
using System.Linq;

namespace Ganymede.Api.Data.Initializers
{
    internal class MonstersInitializer
    {
        public void Initialize(ApplicationDbContext ctx, out IEnumerable<Monster> dAndDMonsters, out IEnumerable<Monster> pfMonsters)
        {
            if (ctx.Monsters.Any())
            {
                aerisi = ctx.Monsters.Single(m => m.Name == "Aerisi Kalinoth");
                dAndDMonsters = ctx.Monsters.Where(m => m.Campaign.Ruleset.Abbrevation == "5e");
                pfMonsters = ctx.Monsters.Where(m => m.Campaign.Ruleset.Abbrevation == "Pf");
            }
            else
            {
                dAndDMonsters = CreateDandDMonsters();
                pfMonsters = CreatePathfinderMonsters();

                ctx.Monsters.AddRange(dAndDMonsters);
                ctx.Monsters.AddRange(pfMonsters);

                aerisi = dAndDMonsters.Single(m => m.Name == "Aerisi Kalinoth");
            }
        }

        private List<Monster> CreateDandDMonsters()
        {
            //TODO: Seed monsters
            return new List<Monster>();
        }

        private List<Monster> CreatePathfinderMonsters()
        {
            return new List<Monster>();
        }
    }
}
