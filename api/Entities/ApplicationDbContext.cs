using api.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Api.Entities
{
	public class ApplicationDbContext : IdentityDbContext<AppUser>
	{
		public DbSet<Attack> Attacks { get; set; }
		public DbSet<Dice> Dices { get; set; }
		public DbSet<Encounter> Encounters { get; set; }
		public DbSet<EncounterMonster> EncounterMonsters { get; set; }
		public DbSet<EncounterGroup> EncounterGroups { get; set; }
		public DbSet<Feature> Features { get; set; }
		public DbSet<Monster> Monsters { get; set; }

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);

			builder.Entity<AppUser>()
					  .HasMany<EncounterGroup>()
					  .WithOne(a => a.AppUser)
					  .HasForeignKey(a => a.AppUserId);

			builder.Entity<EncounterGroup>()
				.HasMany<EncounterGroup>()
				.WithOne(a => a.ParentEncounterGroup)
					  .HasForeignKey(a => a.ParentEncounterGroupId)
				.IsRequired(false);

			builder.Entity<EncounterGroup>()
				  .HasMany<Encounter>()
				  .WithOne(a => a.EncounterGroup)
				  .HasForeignKey(a => a.EncounterGroupId);

			builder.Entity<Encounter>()
				.HasMany<EncounterMonster>()
				.WithOne()
				.HasForeignKey(a => a.EncounterId);

			builder.Entity<Monster>()
				.HasMany<EncounterMonster>()
				.WithOne()
				.HasForeignKey(a => a.MonsterId);

			builder.Entity<Monster>()
				.HasMany<Attack>()
				.WithOne()
				.HasForeignKey(a => a.MonsterId);

			builder.Entity<Monster>()
				.HasMany<Feature>()
				.WithOne()
				.HasForeignKey(a => a.MonsterId);

			builder.Entity<Attack>()
				.HasOne(a => a.Dice)
				.WithOne(b => b.AttackRoll)
				.HasForeignKey<Dice>(b => b.AttackId);
		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseMySql(GetConnectionString());
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
