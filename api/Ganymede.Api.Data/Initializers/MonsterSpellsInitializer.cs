using Ganymede.Api.Data.Monsters;
using Ganymede.Api.Data.Spells;
using System.Collections.Generic;
using System.Linq;

namespace Ganymede.Api.Data.Initializers
{
    internal class MonsterSpellsInitializer
    {
        public void Initialize(ApplicationDbContext ctx, IEnumerable<Spell> dAndDSpells, Monster aerisi)
        {
            IEnumerable<Spell> except = dAndDSpells.Where(s => s.Name == "Detect Magic");

            //TODO: Monster spells
        }
    }
}
