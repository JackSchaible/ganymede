using Ganymede.Api.Data.Initializers.InitializerData;
using Ganymede.Api.Data.Monsters;
using Ganymede.Api.Data.Rulesets;
using Ganymede.Api.Data.Spells;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Ganymede.Api.Data.Initializers
{
	public class DbInitializer : IDbInitializer
	{
        private readonly ApplicationDbContext _ctx;
        private readonly UserManager<AppUser> _usrMgr;

        private readonly UsersInitializer users = new UsersInitializer();
        private readonly PublishersInitializer publishers = new PublishersInitializer();
        private readonly RulesetsInitializer rulesets = new RulesetsInitializer();
        private readonly LookupTablesInitializer lookupTables = new LookupTablesInitializer();
        private readonly EquipmentInitializer equipment = new EquipmentInitializer();
        private readonly MonstersInitializer monsters = new MonstersInitializer();
        private readonly CampaignsInitializer campaigns = new CampaignsInitializer();
        private readonly SpellsInitializer spells = new SpellsInitializer();

        public DbInitializer(ApplicationDbContext ctx, UserManager<AppUser> usrMgr)
        {
            _ctx = ctx;
            _usrMgr = usrMgr;
        }

        public void Initialize()
        {
            string userId = users.Initialize(_ctx, _usrMgr);
            publishers.Initialize(_ctx, out Publisher wizards, out Publisher paizo);
            rulesets.Initialize(_ctx, wizards, paizo, out Ruleset fifth, out Ruleset pf);
            lookupTables.Initialize(_ctx, out Alignments alignments, out DiceRolls diceRolls, out Languages languages, out Skills skills);
            equipment.Initialize(_ctx, out Armors armors);
            campaigns.Initialize(_ctx, userId, fifth, pf, out Campaign pota);
            monsters.Initialize(_ctx, pota, alignments, diceRolls, armors, languages, skills, out IEnumerable<Monster> dAndDMonsters, out IEnumerable<Monster> pfMonsters);
            spells.Initialize(_ctx, pota, out IEnumerable<Spell> dAndDSpells, out _);

            _ctx.SaveChanges();
        }
    }
}
