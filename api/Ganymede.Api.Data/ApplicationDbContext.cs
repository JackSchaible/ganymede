using Ganymede.Api.Data.Monsters;
using Ganymede.Api.Data.Rulesets;
using Ganymede.Api.Data.Spells;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Ganymede.Api.Data
{
	public class ApplicationDbContext : IdentityDbContext<AppUser>
	{
		public DbSet<Campaign> Campaigns { get; set; }
        public DbSet<Publisher> Publishers { get; set; }
        public DbSet<Ruleset> Rulesets { get; set; }
        public DbSet<BasicStats> BasicStats { get; set; }
        public DbSet<Monster> Monsters { get; set; }
        public DbSet<Spell> Spells { get; set; }
        public DbSet<CastingTime> CastingTimes { get; set; }
        public DbSet<SpellComponents> SpellComponents { get; set; }
        public DbSet<SpellDuration> SpellDurations { get; set; }
        public DbSet<SpellRange> SpellRanges { get; set; }
        public DbSet<SpellSchool> SpellSchools { get; set; }
        public DbSet<MonsterSpell> MonsterSpells { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
		{
            builder.Entity<Publisher>()
                .HasIndex(p => p.Name)
                .IsUnique();

            builder.Entity<Ruleset>()
                .HasIndex(r => r.Abbrevation)
                .IsUnique();

            builder.Entity<MonsterSpell>()
                .HasKey(ms => new { ms.MonsterID, ms.SpellID });
            builder.Entity<MonsterSpell>()
                .HasOne(ms => ms.Monster)
                .WithMany(m => m.MonsterSpells)
                .HasForeignKey(ms => ms.MonsterID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<MonsterSpell>()
                .HasOne(ms => ms.Spell)
                .WithMany(s => s.MonsterSpells)
                .HasForeignKey(ms => ms.SpellID)
                .OnDelete(DeleteBehavior.Restrict);

            base.OnModelCreating(builder);
		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder
				.UseSqlServer(@"Server=.;Database=Ganymede;Trusted_Connection=True;",
					opts => opts.EnableRetryOnFailure(3));
		}
	}
}
