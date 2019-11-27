using Ganymede.Api.Data.Common;
using Ganymede.Api.Data.Equipment;
using Ganymede.Api.Data.Initializers.InitializerData;
using Ganymede.Api.Data.Initializers.Monsters.DandD;
using Ganymede.Api.Data.Monsters;
using Ganymede.Api.Data.Monsters.Actions;
using Ganymede.Api.Data.Monsters.BasicStats;
using Ganymede.Api.Data.Monsters.OptionalStats;
using Ganymede.Api.Data.Monsters.OptionalStats.Languages;
using Ganymede.Api.Data.Monsters.SpecialTraits;
using Ganymede.Api.Data.Monsters.SpecialTraits.Spellcasting;
using Ganymede.Api.Data.Spells;
using System.Collections.Generic;
using System.Linq;

namespace Ganymede.Api.Data.Initializers.Monsters
{
    internal abstract class MonsterCreator
    {
        protected AlignmentData _alignments;
        protected DiceRollData _diceRolls;
        protected PlayerClassData _playerClasses;
        protected LanguageData _languages;
        protected SkillData _skills;
        protected SpellData _spells;
        protected ArmorData _armors;

        private Campaign _pota;

        protected abstract DiceRoll HitDice { get; }
        protected abstract string Name { get; }
        protected abstract MonsterType MonsterType { get; }
        protected abstract int Size { get; }

        public MonsterCreator(MonsterInitializationData data)
        {
            _diceRolls = data.DiceRolls;
            _playerClasses = data.Classes;
            _languages = data.Languages;
            _skills = data.Skills;
            _spells = data.Spells;
            _alignments = data.Alignments;
            _armors = data.Armors;

            _pota = data.PrincesOfTheApocalypse;
        }

        public virtual Monster CreateMonster(ApplicationDbContext ctx)
        {
            var monster = new Monster
            {
                AbilityScores = CreateAbilties(),
                ActionSet = CreateActionsSet(),
                BasicStats = new BasicStatsSet
                {
                    AC = CreateArmor(),
                    HPDice = HitDice,
                    Movement = CreateMovement()
                },
                Campaign = _pota,
                LegendaryActions = CreateLegendaryActionsSet(),
                Name = Name,
                Type = MonsterType,
                OptionalStats = CreateOptionalStats(),
                Size = Size,
                SpecialTraitSet = CreateSpecialTraitsSet(),
            };
            ctx.Monsters.Add(monster);

            var languages = CreateLangauges();
            if (languages != null)
                    ctx.MonsterLanguages.AddRange(languages.Select(l => new MonsterLanguage { Language = l, MonsterLanguageSet = monster.OptionalStats.Languages }));

            var skills = CreateSkills();
            if (skills != null)
                ctx.MonsterSkillSets.AddRange(skills);

            var spellcasting = monster.SpecialTraitSet?.SpellcastingModel;
            if (spellcasting != null)
            {
                if (spellcasting.SpellcastingType == 0)
                    ctx.InnateSpellcastingSpellsPerDays.AddRange(CreateInnateSpells());
                else
                {
                    var spellcaster = CreateSpellcaster(spellcasting);
                    spellcaster.Spellcasting = spellcasting;

                    var spells = CreateSpellcasterSpells();
                    ctx.SpellcasterSpells.AddRange(spells.Select(s => new SpellcasterSpells { Spell = s, Spellcaster = spellcaster }));
                }
            }

            var tags = CreateTags();
            if (tags != null)
                ctx.MonsterTags.AddRange(tags.Select(t => new MonsterTag { Monster = monster, Tag = t }));

            var alignments = CreateAlignments();
            if (alignments != null)
                ctx.MonsterAlignments.AddRange(alignments.Select(a => new MonsterAlignment
                {
                    Alignment = a,
                    Monster = monster
                }));

            var armors = CreateArmors();
            if (armors != null)
                ctx.ArmorClassArmors.AddRange(armors.Select(a => new ArmorClassArmor { ArmorClass = monster.BasicStats.AC, Armor = a }));

            return monster;
        }

        protected abstract AbilityScores CreateAbilties();

        protected virtual ActionsSet CreateActionsSet()
        {
            return new ActionsSet
            {
                Actions = CreateActions()
            };
        }
        protected virtual LegendaryActionsSet CreateLegendaryActionsSet()
        {
            return new LegendaryActionsSet
            {
                Actions = CreateLegendaryActions()
            };
        }
        protected virtual ArmorClass CreateArmor() => new ArmorClass();
        protected virtual MonsterMovement CreateMovement() => new MonsterMovement { Ground = 30 };
        protected virtual List<Action> CreateActions() => null;
        protected virtual List<Action> CreateLegendaryActions() => null;
        protected virtual OptionalStatsSet CreateOptionalStats() => new OptionalStatsSet();
        protected virtual SpecialTraitsSet CreateSpecialTraitsSet() =>  new SpecialTraitsSet();
        protected virtual List<Language> CreateLangauges() => null;
        protected virtual List<MonsterSkillSet> CreateSkills() => null;
        protected virtual Spellcaster CreateSpellcaster(MonsterSpellcasting spellcasting) => null;
        protected virtual List<Spell> CreateSpellcasterSpells() => null;
        protected virtual List<InnateSpellcastingSpellsPerDay> CreateInnateSpells() => null;
        protected virtual List<Tag> CreateTags() => null;
        protected virtual List<Alignment> CreateAlignments() => null;
        protected virtual List<Armor> CreateArmors() => null;
    }
}
