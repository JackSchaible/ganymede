using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Api.Entities
{
	public class ApplicationDbContext : IdentityDbContext
	{
		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseMySql(GetConnectionString());
		}

		private static string GetConnectionString()
		{
			const string databaseName = "hr";
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