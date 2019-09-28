using Ganymede.Api.Data.Spells;
using Ganymede.Api.Models.Api;

namespace Ganymede.Api.BLL.Services
{
    public interface ISpellService
    {
        ApiResponse Add(Spell spell, int campaignId, string userId);
        ApiResponse Update(Spell spell, string userId);
        ApiResponse Delete(int id, string userId);

    }
}
