using Ganymede.Api.Data.Rulesets;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Ganymede.Api.Data.Extensions
{
    public static class IQueryableExtensions
    {
        public static IQueryable<Ruleset> IncludePublishers(this IQueryable<Ruleset> rulesets)
        {
            return rulesets
                .Include(r => r.Publisher);
        }

        public static IQueryable<AppUser> IncludeCampaigns(this IQueryable<AppUser> users)
        {
            return users
                .Include(u => u.Campaigns)
                    .ThenInclude(c => c.Ruleset)
                        .ThenInclude(r => r.Publisher);
        }

        public static IQueryable<Campaign> IncludeCampaignData(this IQueryable<Campaign> campaigns)
        {
            return campaigns
                .Include(c => c.Ruleset)
                    .ThenInclude(r => r.Publisher)
                .IncludeMonsters()
                .IncludeSpells();
        }

        public static IQueryable<Campaign> IncludeMonsters(this IQueryable<Campaign> campaigns)
        {
            return campaigns
                .Include(c => c.Monsters)
                    .ThenInclude(m => m.BasicStats)
                .Include(c => c.Monsters)
                    .ThenInclude(m => m.MonsterSpells);
        }

        public static IQueryable<Campaign> IncludeSpells(this IQueryable<Campaign> campaigns)
        {
            return campaigns
                .Include(c => c.Spells)
                    .ThenInclude(s => s.CastingTime)
                .Include(c => c.Spells)
                    .ThenInclude(s => s.SpellRange)
                .Include(c => c.Spells)
                    .ThenInclude(s => s.SpellComponents)
                .Include(c => c.Spells)
                    .ThenInclude(s => s.SpellDuration)
                .Include(c => c.Spells)
                    .ThenInclude(s => s.SpellSchool)
                .Include(c => c.Spells)
                    .ThenInclude(s => s.MonsterSpells);
        }
    }
}
