using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace Ganymede.Api.Data.Monsters.OptionalStats
{
    public class DamageEffectivenessSet
    {
        public int ID { get; set; }

        public string DatabaseVulnerabilities { get; set; }
        [NotMapped]
        public int[] Vulnerabilities
        {
            get => Array.ConvertAll(DatabaseVulnerabilities.Split(','), int.Parse);
            set => DatabaseVulnerabilities = string.Join(",", value.Select(p => p.ToString()).ToArray());
        }

        public string DatabaseResistances { get; set; }
        [NotMapped]
        public int[] Resistances 
        {
            get => Array.ConvertAll(DatabaseResistances.Split(','), int.Parse);
            set => DatabaseResistances = string.Join(",", value.Select(p => p.ToString()).ToArray());
        }

        public string DatabaseImmunities { get; set; }
        [NotMapped]
        public int[] Immunities
        {
            get => Array.ConvertAll(DatabaseImmunities.Split(','), int.Parse);
            set => DatabaseImmunities = string.Join(",", value.Select(p => p.ToString()).ToArray());
        }

        public string DatabaseConditionImmunities { get; set; }
        [NotMapped]
        public int[] ConditionImmunities
        {
            get => Array.ConvertAll(DatabaseConditionImmunities.Split(','), int.Parse);
            set => DatabaseConditionImmunities = string.Join(",", value.Select(p => p.ToString()).ToArray());
        }

        public bool ResistanceToNonMagicAttacks { get; set; }

        public string DatabaseResistanceWeaknesses { get; set; }
        [NotMapped]
        public int[] ResistanceWeaknesses
        {
            get => Array.ConvertAll(DatabaseResistanceWeaknesses.Split(','), int.Parse);
            set => DatabaseResistanceWeaknesses = string.Join(",", value.Select(p => p.ToString()).ToArray());
        }

        public bool ImmuneToNonMagicAttacks { get; set; }

        public string DatabaseImmunityWeaknesses { get; set; }
        [NotMapped]
        public int[] ImmunityWeaknesses
        {
            get => Array.ConvertAll(DatabaseImmunityWeaknesses.Split(','), int.Parse);
            set => DatabaseImmunityWeaknesses = string.Join(",", value.Select(p => p.ToString()).ToArray());
        }
    }
}
