using AutoMapper;
using Ganymede.Api.Data.Monsters.OptionalStats;
using Ganymede.Api.Models.Common;
using Ganymede.Api.Models.Monster.Actions;
using System.Collections.Generic;

namespace Ganymede.Api.Models.Monster.OptionalStats
{
    public class DamageEffectivenessSetModel
    {
        public int ID { get; set; }
        public List<ActionEnums.DamageTypes> Vulnerabilities { get; set; }
        public List<ActionEnums.DamageTypes> Resistances { get; set; }
        public List<ActionEnums.DamageTypes> Immunities { get; set; }
        public List<CommonEnums.Conditions> ConditionImmunities { get; set; }
        public bool ResistanceToNonMagicAttacks { get; set; }
        public List<CommonEnums.ObjectSubstances> ResistanceWeaknesses { get; set; }
        public bool ImmuneToNonMagicAttacks { get; set; }
        public List<CommonEnums.ObjectSubstances> ImmunityWeaknesses { get; set; }
    }

    public class DamageEffectivenessSetModelMapper : Profile
    {
        public DamageEffectivenessSetModelMapper()
        {
            CreateMap<DamageEffectivenessSetModel, DamageEffectivenessSet>()
                .ForMember(d => d.DatabaseConditionImmunities, o => o.Ignore())
                .ForMember(d => d.DatabaseImmunities, o => o.Ignore())
                .ForMember(d => d.DatabaseImmunityWeaknesses, o => o.Ignore())
                .ForMember(d => d.DatabaseResistances, o => o.Ignore())
                .ForMember(d => d.DatabaseResistanceWeaknesses, o => o.Ignore())
                .ForMember(d => d.DatabaseVulnerabilities, o => o.Ignore());
            CreateMap<DamageEffectivenessSet, DamageEffectivenessSetModel>();
        }
    }
}
