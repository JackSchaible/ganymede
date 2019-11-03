using Ganymede.Api.Data.Spells;
using System.Collections.Generic;
using System.Linq;

namespace Ganymede.Api.Data.Initializers
{
    internal class SpellsInitializer
    {
        public void Initialize(ApplicationDbContext ctx, Campaign pota, out IEnumerable<Spell> dAndDSpells, out IEnumerable<Spell> pfSpells)
        {
            pfSpells = null;

            if (ctx.Spells.Any())
                dAndDSpells = ctx.Spells;
            else
            {
                dAndDSpells = CreateDandDSpells(ctx, pota);
                ctx.Spells.AddRange(dAndDSpells);
            }
        }

        private List<Spell> CreateDandDSpells(ApplicationDbContext ctx, Campaign campaign)
        {
            return new SpellsDnDInitializer().Initialize(ctx, campaign);
        }
    }
}
