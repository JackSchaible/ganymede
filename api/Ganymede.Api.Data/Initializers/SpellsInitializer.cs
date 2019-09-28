using Ganymede.Api.Data.Spells;
using System.Collections.Generic;
using System.Linq;

namespace Ganymede.Api.Data.Initializers
{
    internal class SpellsInitializer
    {
        public void Initialize(ApplicationDbContext ctx, IEnumerable<SpellSchool> dAndDSchools, IEnumerable<SpellSchool> pfSchools, Campaign pota, out IEnumerable<Spell> dAndDSpells, out IEnumerable<Spell> pfSpells)
        {
            pfSpells = null;

            if (ctx.Spells.Any())
                dAndDSpells = ctx.Spells;
            else
            {
                dAndDSpells = CreateDandDSpells(ctx, dAndDSchools, pota.ID);
                ctx.Spells.AddRange(dAndDSpells);
            }
        }

        private List<Spell> CreateDandDSpells(ApplicationDbContext ctx, IEnumerable<SpellSchool> schools, int campaignID)
        {
            return new SpellsDnDInitializer().Initialize(ctx, schools, campaignID);
        }
    }
}
