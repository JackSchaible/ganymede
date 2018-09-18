using Api.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Internal;

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

		public async void Initialize()
		{
			if (!_ctx.Users.Any())
			{
				var email = "jack.schaible@hotmail.com";
				var usrResult = await _usrMgr.CreateAsync(new AppUser { Email = email, UserName = email }, "Testing!23");
				var usr = await _usrMgr.FindByEmailAsync(email);

				var encounterGroup = new EncounterGroup
				{
					Name = "Default Group",
					Description = "",
					AppUserId = usr.Id
				};
				_ctx.EncounterGroups.Add(encounterGroup);

				var encounter = new Encounter
				{
					Difficulty = "Hard",
					EncounterGroupId = encounterGroup.EncounterGroupId,
					Location = "Room 1",
					Name = "Aww, Rats!",
					Notes = "Fuck yea pack tactics!",
					XP = 200
				};
				_ctx.Encounters.Add(encounter);

				var monster = new Monster
				{
					AC = 12,
					Challenge = 0.125m,
					Initiative = 2,
					IsPlayer = false,
					Name = "Giant Rat",
					Race = "beast",
					Size = "Small",
					Speed = 30,
					Type = "unaligned",
					XP = 25,
					Strength = 7,
					Dexterity = 15,
					Constitution = 11,
					Intelligence = 2,
					Wisdom = 10,
					Charisma = 4
				};
				_ctx.Monsters.Add(monster);

				var attack = new Attack
				{
					AttackBonus = 4,
					DamageType = "Piercing",
					MonsterId = monster.MonsterId,
					Name = "Bite",
					Reach = 5,
					Target = "one target",
					Type = "Melee Weapon Attack"
				};
				_ctx.Attacks.Add(attack);

				var dice = new Dice { AttackId = attack.AttackId, Count = 1, Sides = 4 };
				_ctx.Dices.Add(dice);

				var features = new[]
				{
					new Feature
					{
						Description = "The rat has advantage on Wisdom (Perception) checks that rely on smell.",
						Name = "Keen Smell",
						MonsterId = monster.MonsterId
					},
					new Feature
					{
						Description =
							"The rat has advantage on an attack roll against a creature if at least one of the rat's allies is within 5 ft. of the creature and the ally isn't incapacitated.",
						Name = "Pack Tactics",
						MonsterId = monster.MonsterId
					}
				};
				_ctx.Features.AddRange(features);

				var encounterMonsters = new[]
				{
					new EncounterMonster
					{
						MonsterId = monster.MonsterId,
						EncounterId = encounter.EncounterId
					},
					new EncounterMonster
					{
						MonsterId = monster.MonsterId,
						EncounterId = encounter.EncounterId
					},
					new EncounterMonster
					{
						MonsterId = monster.MonsterId,
						EncounterId = encounter.EncounterId
					},
				};
				_ctx.EncounterMonsters.AddRange(encounterMonsters);
			}
		}
	}
}
