using Ganymede.Api.Models.Common;
using Ganymede.Api.Models.Monster.Actions;
using System.Collections.Generic;

namespace Ganymede.Api.Models.Monster.OptionalStats
{
    public class DamageEffectivenessesModel
    {
        public List<ActionEnums.DamageTypes> Vulnerabilities { get; set; }
        public List<ActionEnums.DamageTypes> Resistances { get; set; }
        public List<ActionEnums.DamageTypes> Immunities { get; set; }
        public List<CommonEnums.Conditions> ConditionImmunities { get; set; }
        public bool ResistanceToNonMagicAttacks { get; set; }
        public List<CommonEnums.ObjectSubstances> ResistanceWeaknesses { get; set; }
        public bool ImmuneToNonMagicAttacks { get; set; }
        public List<CommonEnums.ObjectSubstances> ImmunityWeaknesses { get; set; }
    }
}
