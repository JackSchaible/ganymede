using System.Collections.Generic;
using Ganymede.Api.Data.Common;
using Ganymede.Api.Data.Equipment;
using Ganymede.Api.Data.Monsters;
using Ganymede.Api.Data.Monsters.Actions;
using Ganymede.Api.Data.Monsters.SpecialTraits;
using Ganymede.Api.Data.Monsters.SpecialTraits.Spellcasting;
using Ganymede.Api.Data.Spells;
using static Ganymede.Api.Data.Initializers.Monsters.MonstersInitializer;

namespace Ganymede.Api.Data.Initializers.Monsters.DandD.Implementations
{
    internal class Thurl : MonsterCreator
    {
        protected override DiceRoll HitDice => _diceRolls.ElevenDEight;
        protected override string Name => "Thurl Merosska";
        protected override MonsterType MonsterType => MonstersConstants.MTHumanoid;
        protected override int Size => MonstersConstants.SMedium;

        public Thurl(MonsterInitializationData data)
            : base(data) { }

        protected override AbilityScores CreateAbilties()
        {
            return new AbilityScores
            {
                Strength = 16,
                Dexterity = 14,
                Constitution = 14,
                Intelligence = 11,
                Wisdom = 10,
                Charisma = 15
            };
        }

        protected override ActionsSet CreateActionsSet()
        {
            var greatswordAttack = new Attack
            {
                Action = new Action
                {
                    Name = "Greatsword"
                },
                Type = MonstersConstants.WAMelee,
                Target = MonstersConstants.TTarget,
                HitEffects = new List<HitEffect>
                {
                    new HitEffect
                    {
                        Damage = _diceRolls.TwoDSix,
                        DamageType = MonstersConstants.DTSlashing,
                    }
                }
            };

            var lanceAttack = new Attack
            {
                Action = new Action
                {
                    Name = "Lance"
                },
                Type = MonstersConstants.WAMelee,
                HitEffects = new List<HitEffect>
                {
                    new HitEffect
                    {
                        Damage = _diceRolls.OneDTwelve,
                        DamageType = MonstersConstants.DTPiercing
                    }
                },
                RangeMin = 10,
                Target = MonstersConstants.TTarget
            };

            return new ActionsSet
            {
                Actions = new List<Action>
                {
                    greatswordAttack.Action,
                    lanceAttack.Action,
                    new Action
                    {
                        Name = "Parry",
                        Description = "Thurl adds 2 to his AC against one melee attack that would hit him. To do so, Thurl must see the attacker and be wielding a melee weapon.",
                        Reaction = true
                    }
                },
                Multiattack = "Thurl makes two melee attacks.",
            };
        }

        protected override SpecialTraitsSet CreateSpecialTraitsSet()
        {
            return new SpecialTraitsSet
            {
                SpellcastingModel = new MonsterSpellcasting
                {
                    SpellcastingAbility = MonstersConstants.ACha,
                    SpellcastingType = MonstersConstants.SCTSpellcaster,
                }
            };
        }

        protected override Spellcaster CreateSpellcaster(MonsterSpellcasting spellcasting)
        {
            return new Spellcaster
            {
                SpellcasterLevel = 5,
                SpellcastingClass = _playerClasses.Sorcerer,
                SpellsPerDay = new int[9] { 4, 3, 2, 0, 0, 0, 0, 0, 0 },
                Spellcasting = spellcasting
            };
        }

        protected override List<Language> CreateLangauges()
        {
            return new List<Language>
            {
                _languages.Auran,
                _languages.Common
            };
        }

        protected override List<MonsterSkillSet> CreateSkills()
        {
            return new List<MonsterSkillSet>
            {
                new MonsterSkillSet { Skill = _skills.AnimalHandling },
                new MonsterSkillSet { Skill = _skills.Athletics },
                new MonsterSkillSet { Skill = _skills.Deception },
                new MonsterSkillSet { Skill = _skills.Persuasion }
            };
        }

        protected override List<Spell> CreateSpellcasterSpells()
        {
            return new List<Spell>
            {
                _spells.Haste,
                _spells.MistyStep,
                _spells.Levitate,
                _spells.ExpeditiousRetreat,
                _spells.FeatherFall,
                _spells.Jump,
                _spells.Friends,
                _spells.Gust,
                _spells.Light,
                _spells.Message,
                _spells.RayOfFrost
            };
        }

        protected override List<Armor> CreateArmors() => new List<Armor> { _armors.Breastplate };
        protected override List<Tag> CreateTags() => new List<Tag> { MonstersConstants.THuman };
        protected override List<Alignment> CreateAlignments() => new List<Alignment> { _alignments.LawfulEvil };
    }
}
