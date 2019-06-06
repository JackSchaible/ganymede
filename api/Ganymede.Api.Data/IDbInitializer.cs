using System.Threading.Tasks;

namespace Ganymede.Api.Data
{
	public interface IDbInitializer
	{
		Task Initialize();
	}
}
