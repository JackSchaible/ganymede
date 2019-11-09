using Ganymede.Api.Data.Initializers.InitializerData;
using Ganymede.Api.Data.Monsters;
using Ganymede.Api.Data.Rulesets;
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
        private readonly PlayerClassInitializer pcs = new PlayerClassInitializer();
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
            lookupTables.Initialize(_ctx, out AlignmentData alignments, out DiceRollData diceRolls, out LanguageData languages, out SkillData skills);
            equipment.Initialize(_ctx, out ArmorData armors);
            campaigns.Initialize(_ctx, userId, fifth, pf, out Campaign pota);
            pcs.Initialize(_ctx, out PlayerClassData pcData);
            spells.Initialize(_ctx, pota, out SpellData spellData);
            monsters.Initialize(_ctx, pota, alignments, diceRolls, armors, languages, skills, pcData, spellData, out IEnumerable<Monster> dAndDMonsters, out IEnumerable<Monster> pfMonsters);

            _ctx.SaveChanges();
        }
    }
}
