using System.Threading.Tasks;

namespace Ganymede.Api.Data.Initializers
{
	public interface IDbInitializer
	{
		Task Initialize();
	}
}
