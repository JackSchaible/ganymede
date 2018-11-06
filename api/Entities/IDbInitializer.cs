using System.Threading.Tasks;

namespace api.Entities
{
	public interface IDbInitializer
	{
		Task Initialize();
	}
}
