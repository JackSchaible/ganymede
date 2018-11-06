using api.Entities.Spells;
using Api.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Internal;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

		public async Task Initialize()
		{
			string userId;
			var email = "jack.schaible@hotmail.com";

			if (!EnumerableExtensions.Any(_ctx.Users))
			{
				var usrResult = await _usrMgr.CreateAsync(new AppUser {Email = email, UserName = email}, "Testing!23");
				var usr = await _usrMgr.FindByEmailAsync(email);
				userId = usr.Id;
			}
			else
				userId = Queryable.First(_ctx.Users, x => x.Email == email).Id;

			if (!EnumerableExtensions.Any(_ctx.Spells))
				_ctx.Spells.AddRange(CreateSpells(userId));

			_ctx.SaveChanges();
		}

		private List<Spell> CreateSpells(string userId)
		{
			return new List<Spell>()
				{
					new Spell
					{
						Name = "Animal Friendship",
						Classes = new []
						{
							PlayerClasses.Druid,
							PlayerClasses.Bard,
							PlayerClasses.Ranger
						},
						Level = 1,
						SpellSchool = SpellSchools.Enchantment,
						CastingTime = new CastingTime
						{
							TimeType = "action",
							Amount = "1"
						},
						Range = new Range
						{
							RangeType = "feet",
							Amount = "30"
						},
						Components = new Components
						{
							Verbal = true,
							Somatic = true,
							Material = "A morsel of food"
						},
						SpellDuration = new Duration
						{
							DurationType = "hour",
							Length = "24",
							Concentration = false
						},
						Description = "<p>This spell lets you convince a beast that you mean it no harm. Choose a beast that you can see within range. It must see and hear you. If the beast’s Intelligence is 4 or higher, the spell fails. Otherwise, the beast must succeed on a Wisdom saving throw or be charmed by you for the spell’s duration. If you or one of your companions harms the target, the spells ends.</p>",
						AtHigherLevels = "<p>When you cast this spell using a spell slot of 2nd level or higher, you can affect one additional beast for each slot level above 1st.</p>",
						AppUserId = userId
					},
					new Spell
					{
						Name = "Aid",
						Classes = new []
						{
							PlayerClasses.Cleric,
							PlayerClasses.Paladin
						},
						Level = 2,
						SpellSchool = SpellSchools.Abjuration,
						CastingTime = new CastingTime
						{
							TimeType = "action",
							Amount = "1"
						},
						Range = new Range
						{
							RangeType = "feet",
							Amount = "30"
						},
						Components = new Components
						{
							Verbal = true,
							Somatic = true,
							Material = "A tiny strip of white cloth"
						},
						SpellDuration = new Duration
						{
							DurationType = "hour",
							Length = "8",
							Concentration = false
						},
						Description = "<p>Your spell bolsters your allies with toughness and resolve. Choose up to three creatures within range. Each target’s hit point maximum and current hit points increase by 5 for the duration.</p>",
						AtHigherLevels = "<p>When you cast this spell using a spell slot of 3rd level or higher, a target’s hit points increase by an additional 5 for each slot level above 2nd.</p>",
						AppUserId = userId
					},
					new Spell
					{
						Name = "Animal Messenger",
						Classes = new []
						{
							PlayerClasses.Druid,
							PlayerClasses.Bard,
							PlayerClasses.Ranger
						},
						Level = 2,
						SpellSchool = SpellSchools.Enchantment,
						CastingTime = new CastingTime
						{
							TimeType = "action",
							Amount = "1"
						},
						Range = new Range
						{
							RangeType = "feet",
							Amount = "30"
						},
						Components = new Components
						{
							Verbal = true,
							Somatic = true,
							Material = "A morsel of food"
						},
						SpellDuration = new Duration
						{
							DurationType = "hour",
							Length = "24",
							Concentration = false
						},
						Description = "<p>By means of this spell, you use an animal to deliver a message. Choose a Tiny beast you can see within range, such as a squirrel, a blue jay, or a bat. You specify a location, which you must have visited, and a recipient who matches a general description, such as “a man or woman dressed in the uniform of the town guard” or “a red-haired dwarf wearing a pointed hat.” You also speak a message of up to twenty-five words. The target beast travels for the duration of the spell toward the specified location, covering about 50 miles per 24 hours for a flying messenger, or 25 miles for other animals.</p>",
						AtHigherLevels = "<p>If you cast this spell using a spell slot of 3rd level or higher, the Duration of the spell increases by 48 hours for each slot level above 2nd.</p>",
						AppUserId = userId
					},
					new Spell
					{
						Name = "Find Steed",
						Classes = new []
						{
							PlayerClasses.Paladin
						},
						Level = 2,
						SpellSchool = SpellSchools.Conjuration,
						CastingTime = new CastingTime
						{
							TimeType = "minute",
							Amount = "10"
						},
						Range = new Range
						{
							RangeType = "feet",
							Amount = "30"
						},
						Components = new Components
						{
							Verbal = true,
							Somatic = true,
							Material = null
						},
						SpellDuration = new Duration
						{
							DurationType = "Instantaneous",
							Length = null,
							Concentration = false
						},
						Description = "<p>You summon a spirit that assumes the form of an unusually intelligent, strong, and loyal steed, creating a long-lasting bond with it. Appearing in an unoccupied space within range, the steed takes on a form that you choose: a warhorse, a pony, a camel, an elk, or a mastiff. (Your GM might allow other animals to be summoned as steeds.) The steed has the statistics of the chosen form, though it is a celestial, fey, or fiend (your choice) instead of its normal type. Additionally, if your steed has an Intelligence of 5 or less, its Intelligence becomes 6, and it gains the ability to understand one language of your choice that you speak.</p>" +
									  "<p>Your steed serves you as a mount, both in combat and out, and you have an instinctive bond with it that allows you to fight as a seamless unit. While mounted on your steed, you can make any spell you cast that targets only you also target your steed.</p>" +
									  "<p>When the steed drops to 0 hit points, it disappears, leaving behind no physical form. You can also dismiss your steed at any time as an action, causing it to disappear. In either case, casting this spell again summons the same steed, restored to its hit point maximum.</p>" +
									  "<p>While your steed is within 1 mile of you, you can communicate with it telepathically.</p>" +
									  "<p>You can’t have more than one steed bonded by this spell at a time. As an action, you can release the steed from its bond at any time, causing it to disappear.</p>",
						AtHigherLevels = null,
						AppUserId = userId
					},
					new Spell
					{
						Name = "Hunter's Mark",
						Classes = new []
						{
							PlayerClasses.Ranger
						},
						Level = 1,
						SpellSchool = SpellSchools.Divination,
						CastingTime = new CastingTime
						{
							TimeType = "bonus action",
							Amount = "1"
						},
						Range = new Range
						{
							RangeType = "feet",
							Amount = "90"
						},
						Components = new Components
						{
							Verbal = true,
							Somatic = false,
							Material = null
						},
						SpellDuration = new Duration
						{
							DurationType = "hour",
							Length = "1",
							Concentration = true
						},
						Description = "<p>You choose a creature you can see within range and mystically mark it as your quarry. Until the spell ends, you deal an extra 1d6 damage to the target whenever you hit it with a weapon attack, and you have advantage on any Wisdom (Perception) or Wisdom (Survival) check you make to find it. If the target drops to 0 hit points before this spell ends, you can use a bonus action on a subsequent turn of yours to mark a new creature.</p>",
						AtHigherLevels = "<p>When you cast this spell using a spell slot of 3rd or 4th level, you can maintain your Concentration on the spell for up to 8 hours. When you use a spell slot of 5th level or higher, you can maintain your concentr⁠ation on the spell for up to 24 hours.</p>",
						AppUserId = userId
					},
					new Spell
					{
						Name = "Incendiary Cloud",
						Classes = new []
						{
							PlayerClasses.Sorcerer,
							PlayerClasses.Wizard
						},
						Level = 8,
						SpellSchool = SpellSchools.Evocation,
						CastingTime = new CastingTime
						{
							TimeType = "action",
							Amount = "1"
						},
						Range = new Range
						{
							RangeType = "feet",
							Amount = "150"
						},
						Components = new Components
						{
							Verbal = true,
							Somatic = true,
							Material = null
						},
						SpellDuration = new Duration
						{
							DurationType = "minute",
							Length = "1",
							Concentration = true
						},
						Description = "<p>A swirling cloud of smoke shot through with white-hot embers appears in a 20-foot-radius sphere centered on a point within range. The cloud spreads around corners and is heavily obscured. It lasts for the duration or until a wind of moderate or greater speed (at least 10 miles per hour) disperses it.</p>" +
									  "<p>When the cloud appears, each creature in it must make a Dexterity saving throw. A creature takes 10d8 fire damage on a failed save, or half as much damage on a successful one. A creature must also make this saving throw when it enters the spell’s area for the first time on a turn or ends its turn there.</p>" +
									  "<p>The cloud moves 10 feet directly away from you in a direction that you choose at the start of each of your turns.</p>",
						AtHigherLevels = null,
						AppUserId = userId
					},
				};
		}
	}
}
