using Ganymede.Api.Models.Monster.OptionalStats.Languages;

namespace Ganymede.Api.Models.Monster.OptionalStats
{
    public class OptionalStatsSetModel
    {
        public int ID { get; set; }

        public MonsterSavingThrowsModel SavingThrows { get; set; }
        public DamageEffectivenessSetModel Effectivenesses { get; set; }
        public SensesModel Senses { get; set; }
        public MonsterLanguageSetModel Languages { get; set; }
    }
}
