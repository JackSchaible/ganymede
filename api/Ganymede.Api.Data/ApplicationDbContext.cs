using Ganymede.Api.Data.Monsters;
using Ganymede.Api.Data.Rulesets;
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

        protected override void OnModelCreating(ModelBuilder builder)
		{
            builder.Entity<Publisher>()
                .HasIndex(p => p.Name)
                .IsUnique();

            builder.Entity<Ruleset>()
                .HasIndex(r => r.Abbrevation)
                .IsUnique();

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
