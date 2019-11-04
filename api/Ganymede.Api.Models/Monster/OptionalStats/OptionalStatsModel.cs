using Ganymede.Api.Models.Monster.OptionalStats.Languages;

namespace Ganymede.Api.Models.Monster.OptionalStats
{
    public class OptionalStatsModel
    {
        public MonsterSavingThrowsModel SavingThrows { get; set; }
        public DamageEffectivenessesModel Effectivenesses { get; set; }
        public SensesModel Senses { get; set; }
        public MonsterLanguagesModel Languages { get; set; }
    }
}
