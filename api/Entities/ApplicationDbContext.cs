using api.Entities;
using api.Entities.Spells;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Api.Entities
{
	public class ApplicationDbContext : IdentityDbContext<AppUser>
	{
		public DbSet<Spell> Spells { get; set; }

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);
		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder
				.UseSqlServer(@"Server=.;Database=Ganymede;Trusted_Connection=True;",
					opts => opts.EnableRetryOnFailure(3));
			//optionsBuilder.UseMySql(GetConnectionString());
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
