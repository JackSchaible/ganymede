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
            if (!ctx.MonsterSpells.Any())
                ctx.MonsterSpells.AddRange(dAndDSpells.Select(s => new MonsterSpell
                {
                    MonsterID = aerisi.ID,
                    SpellID = s.ID
                }));
        }
    }
}
