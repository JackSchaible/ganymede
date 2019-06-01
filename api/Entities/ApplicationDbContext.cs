using api.Entities.Rulesets;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Entities
{
	public class ApplicationDbContext : IdentityDbContext<AppUser>
	{
		public DbSet<Campaign> Campaigns { get; set; }
        public DbSet<Publisher> Publishers { get; set; }
        public DbSet<Ruleset> Rulesets { get; set; }

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

		private static string GetConnectionString()
		{
			const string databaseName = "ganymede";
			const string databaseUser = "root";
			const string databasePass = "";

			return $"Server=localhost;" +
				   $"database={databaseName};" +
				   $"uid={databaseUser};" +
				   $"pwd={databasePass};" +
				   $"pooling=true;";
		}
	}
}
