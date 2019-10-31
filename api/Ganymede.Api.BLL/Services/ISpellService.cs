using Ganymede.Api.Models.Api;
using Ganymede.Api.Models.Spells;

namespace Ganymede.Api.BLL.Services
{
    public interface ISpellService
    {
        ApiResponse Add(SpellModel spell, string userId);
        ApiResponse Update(SpellModel spell, string userId);
        ApiResponse Delete(int id, string userId);
    }
}
