using Ganymede.Api.Data.Common;
using Ganymede.Api.Data.Monsters;
using Ganymede.Api.Data.Monsters.Actions;
using Ganymede.Api.Data.Monsters.BasicStats;
using Ganymede.Api.Data.Monsters.OptionalStats;
using Ganymede.Api.Data.Monsters.OptionalStats.Languages;
using Ganymede.Api.Data.Monsters.SpecialTraits;
using Ganymede.Api.Data.Monsters.SpecialTraits.Spellcasting;
using Ganymede.Api.Data.Spells;
using System.Collections.Generic;
using static Ganymede.Api.Data.Initializers.Monsters.MonsterConfigurationData;
using static Ganymede.Api.Data.Initializers.Monsters.MonstersInitializer;
using Action = Ganymede.Api.Data.Monsters.Actions.Action;

namespace Ganymede.Api.Data.Initializers.Monsters.DandD.Implementations
{
    internal class Aerisi : MonsterCreator
    {
        protected override AbilityScores CreateAbilties() => new AbilityScores
        {
            Strength = 8,
            Dexterity = 16,
            Constitution = 12,
            Intelligence = 17,
            Wisdom = 10,
            Charisma = 16
        };
        protected override List<Action> CreateActions()
        {
            var windvane = new Attack
            {
                HitEffects = new List<HitEffect>
                {
                    new HitEffect
                    {
                        Condition = "if used with two hands to make a melee attack",
                        Damage = _diceRolls.OneDEight,
                        DamageType = MonstersConstants.DTPiercing
                    },
                    new HitEffect
                    {
                        Condition = "",
                        Damage = _diceRolls.OneDSix,
                        DamageType = MonstersConstants.DTPiercing
                    },
                    new HitEffect
                    {
                        Damage = _diceRolls.OneDSix,
                        DamageType = MonstersConstants.DTLightning
                    }
                },
                Action = new Action
                {
                    Name = "Windvane"
                }
            };

            return new List<Action>
            {
                windvane.Action
            };
        }
        protected override ArmorClass CreateArmor() => new ArmorClass { NaturalArmorModifier = 2 };

        protected override DiceRoll HitDice => _diceRolls.TwelveDEight;
        protected override string Name => "Aerisi Kalinoth";
        protected override MonsterType MonsterType => MonstersConstants.MTHumanoid;
        protected override int Size => MonstersConstants.SMedium;

        public Aerisi(MonsterInitializationData data)
            : base(data) { }

        protected override List<Action> CreateLegendaryActions()
        {
            return new List<Action>
            {
                new Action
                {
                    Name = "Free Spell",
                    Description = "<p>If Aerisi is in the air node while Yan-C-Bin isn't, Aerisi can take lair actions. On initiative count 20 (losing initiative ties), Aerisi uses a lair action to cast one of her spells, up to 3rd level, without using components or a spell slot. She can't cast the same spell two rounds in a row, although she can continue to concentrate on a spell she previously cast using a lair action. Aerisi can take no other lair actions while concentrating on a spell cast as a lair action.</p><p>If Aerisi casts invisibility using this lair action, she also draws the power of the air node into herself. By doing so, she regains 15 (3d8 + 2) hit points.</p>",
                    Lair = true
                }
            };
        }

        protected override OptionalStatsSet CreateOptionalStats()
        {
            return new OptionalStatsSet
            {
                Effectivenesses = new DamageEffectivenessSet
                {
                    Resistances = new int[1] { MonstersConstants.DTLightning }
                },
                Languages = new MonsterLanguageSet { },
                Senses = new Senses
                {
                    Darkvision = 60
                }
            };
        }

        protected override SpecialTraitsSet CreateSpecialTraitsSet()
        {
            return new SpecialTraitsSet
            {
                SpecialTraits = new List<SpecialTrait>
                {
                    new SpecialTrait
                    {
                        Name = "Fey Ancestry",
                        Description = "<p>Aerisi has advantage on saving throws against being charmed, and magic can't put her to sleep.</p>"
                    },
                    new SpecialTrait
                    {
                        Name = "Howling Defeat",
                        Description = "<p>When Aerisi drops to 0 hit points, her body disappears in a howling whirlwind that disperses quickly and harmlessly. Anything she is wearing or carrying is left behind.</p>"
                    },
                    new SpecialTrait
                    {
                        Name = "Legendary Resistance (2/Day)",
                        Description = "<p>If Aerisi fails a saving throw, she can choose to succeed instead.</p>"
                    }
                },
                SpellcastingModel = new MonsterSpellcasting
                {
                    SpellcastingAbility = MonstersConstants.AInt,
                    SpellcastingType = MonstersConstants.SCTSpellcaster
                }
            };
        }

        protected override List<Language> CreateLangauges()
        {
            return new List<Language>
            {
                _languages.Auran,
                _languages.Common,
                _languages.Elvish,
            };
        }

        protected override List<MonsterSkillSet> CreateSkills()
        {
            return new List<MonsterSkillSet>
            {
                new MonsterSkillSet { Skill = _skills.Arcana },
                new MonsterSkillSet { Skill = _skills.History },
                new MonsterSkillSet { Skill = _skills.Perception }
            };
        }

        protected override Spellcaster CreateSpellcaster(MonsterSpellcasting spellcasting)
        {
            return new Spellcaster
            {
                SpellcasterLevel = 12,
                SpellcastingClass = _playerClasses.Wizard,
                SpellsPerDay = new int[9] { 4, 3, 3, 3, 2, 1, 0, 0, 0 },
                Spellcasting = spellcasting
            };
        }

        protected override List<Spell> CreateSpellcasterSpells()
        {
            return new List<Spell>
            {
                _spells.ChainLightning,
                    _spells.Seeming,
                    _spells.Cloudkill,
                    _spells.IceStorm,
                    _spells.StormSphere,
                    _spells.LightningBolt,
                    _spells.GaseousForm,
                    _spells.Fly,
                    _spells.DustDevil,
                    _spells.GustOfWind,
                    _spells.Invisibility,
                    _spells.Thunderwave,
                    _spells.MageArmor,
                    _spells.FeatherFall,
                    _spells.CharmPerson,
                    _spells.ShockingGrasp,
                    _spells.RayOfFrost,
                    _spells.Prestidigitation,
                    _spells.Message,
                    _spells.MageHand,
                    _spells.Gust
            };
        }

        protected override List<Tag> CreateTags()
        {
            return new List<Tag>
            {
                MonstersConstants.TElf
            };
        }

        protected override List<Alignment> CreateAlignments()
        {
            return new List<Alignment> { _alignments.NeutralEvil };
        }
    }
}