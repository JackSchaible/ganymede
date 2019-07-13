using Ganymede.Api.Data.Monsters;
using Ganymede.Api.Data.Rulesets;
using Ganymede.Api.Data.Spells;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ganymede.Api.Data.Initializers
{
	public class DbInitializer : IDbInitializer
	{
        private readonly ApplicationDbContext _ctx;
        private readonly UserManager<AppUser> _usrMgr;

        private readonly UsersInitializer users = new UsersInitializer();
        private readonly PublishersInitializer publishers = new PublishersInitializer();
        private readonly RulesetsInitializer rulesets = new RulesetsInitializer();
        private readonly SpellSchoolsInitializer schools = new SpellSchoolsInitializer();
        private readonly MonstersInitializer monsters = new MonstersInitializer();
        private readonly CampaignsInitializer campaigns = new CampaignsInitializer();
        private readonly SpellsInitializer spells = new SpellsInitializer();
        private readonly MonsterSpellsInitializer monsterSpells = new MonsterSpellsInitializer();

        public DbInitializer(ApplicationDbContext ctx, UserManager<AppUser> usrMgr)
        {
            _ctx = ctx;
            _usrMgr = usrMgr;
        }

        public async Task Initialize()
        {
            string userId = await users.Initialize(_ctx, _usrMgr);
            publishers.Initialize(_ctx, out Publisher wizards, out Publisher paizo);
            rulesets.Initialize(_ctx, wizards, paizo, out Ruleset fifth, out Ruleset pf);
            schools.Initialize(_ctx, out IEnumerable<SpellSchool> dAndDSchools, out IEnumerable<SpellSchool> pfSchools);
            monsters.Initialize(_ctx, out IEnumerable<Monster> dAndDMonsters, out IEnumerable<Monster> pfMonsters, out Monster aerisi);
            campaigns.Initialize(_ctx, userId, fifth, pf, dAndDMonsters, pfMonsters, out Campaign pota);
            spells.Initialize(_ctx, dAndDSchools, pfSchools, pota, out IEnumerable<Spell> dAndDSpells, out IEnumerable<Spell> pfSpells);
            monsterSpells.Initialize(_ctx, dAndDSpells, aerisi);

            _ctx.SaveChanges();
        }
    }
}
