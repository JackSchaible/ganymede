using Ganymede.Api.Data.Characters;
using Ganymede.Api.Data.Common;
using Ganymede.Api.Data.Initializers.InitializerData;
using Ganymede.Api.Data.Monsters;
using Ganymede.Api.Data.Monsters.Actions;
using Ganymede.Api.Data.Monsters.BasicStats;
using Ganymede.Api.Data.Monsters.OptionalStats;
using Ganymede.Api.Data.Monsters.SpecialTraits;
using System.Collections.Generic;
using System.Linq;

namespace Ganymede.Api.Data.Initializers
{
    internal class MonstersInitializer
    {
        private static class Constants
        {
            public const int AStr = 0;
            public const int ADex = 1;
            public const int ACon = 2;
            public const int AInt = 3;
            public const int AWis = 4;
            public const int ACha = 5;

            public const int DTAcid = 0;
            public const int DTBludgeoning = 1;
            public const int DTCold = 2;
            public const int DTFire = 3;
            public const int DTForce = 4;
            public const int DTLightning = 5;
            public const int DTNecrotic = 6;
            public const int DTPiercing = 7;
            public const int DTPoison = 8;
            public const int DTPsychic = 9;
            public const int DTRadiant = 10;
            public const int DTSlashing = 11;
            public const int DTThunder = 12;

            public static MonsterType MTAbberation;
            public static MonsterType MTBeast;
            public static MonsterType MTCelestial;
            public static MonsterType MTConstruct;
            public static MonsterType MTDragon;
            public static MonsterType MTElemental;
            public static MonsterType MTFey;
            public static MonsterType MTFiend;
            public static MonsterType MTGiant;
            public static MonsterType MTHumanoid;
            public static MonsterType MTMonstrosity;
            public static MonsterType MTOoze;
            public static MonsterType MTPlant;
            public static MonsterType MTUndead;

            public const int STiny = 0;
            public const int SSmall = 1;
            public const int SMedium = 2;
            public const int SLarge = 3;
            public const int SHuge = 4;
            public const int SGargantuan = 5;

            public const int SCTInnate = 0;
            public const int SCTSpellcaster = 1;

            public const int TCreature = 0;
            public const int TTarget = 1;

            public const int AMelee = 0;
            public const int ARanged = 1;

            public static Tag TElf;
            public static Tag THuman;
        }
        public void Initialize(ApplicationDbContext ctx, Campaign pota, AlignmentData alignments,
            DiceRollData diceRolls, ArmorData armors, LanguageData languages, SkillData skills,
            PlayerClassData pcData, SpellData spells,
            out IEnumerable<Monster> dAndDMonsters, out IEnumerable<Monster> pfMonsters)
        {
            if (ctx.Monsters.Any())
            {
                dAndDMonsters = ctx.Monsters.Where(m => m.Campaign.Ruleset.Abbrevation == "5e");
                pfMonsters = ctx.Monsters.Where(m => m.Campaign.Ruleset.Abbrevation == "Pf");
            }
            else
            {
                CreateMonsterTypes(ctx);
                CreateMonsterTags(ctx);
                dAndDMonsters = CreateDandDMonsters(ctx, pota, alignments, diceRolls, armors,
                    languages, skills, pcData, spells);
                pfMonsters = CreatePathfinderMonsters();

                ctx.Monsters.AddRange(dAndDMonsters);
                ctx.Monsters.AddRange(pfMonsters);
            }
        }

        private void CreateMonsterTypes(ApplicationDbContext ctx)
        {
            if (ctx.MonsterTypes.Any())
            {
                Constants.MTAbberation = ctx.MonsterTypes.Single(mt => mt.Name == "Abberation");
                Constants.MTBeast = ctx.MonsterTypes.Single(mt => mt.Name == "Beast");
                Constants.MTCelestial = ctx.MonsterTypes.Single(mt => mt.Name == "Celestial");
                Constants.MTConstruct = ctx.MonsterTypes.Single(mt => mt.Name == "Construct");
                Constants.MTDragon = ctx.MonsterTypes.Single(mt => mt.Name == "Dragon");
                Constants.MTElemental = ctx.MonsterTypes.Single(mt => mt.Name == "Elemental");
                Constants.MTFey = ctx.MonsterTypes.Single(mt => mt.Name == "Fiend");
                Constants.MTFiend = ctx.MonsterTypes.Single(mt => mt.Name == "Fey");
                Constants.MTGiant = ctx.MonsterTypes.Single(mt => mt.Name == "Giant");
                Constants.MTHumanoid = ctx.MonsterTypes.Single(mt => mt.Name == "Humanoid");
                Constants.MTMonstrosity = ctx.MonsterTypes.Single(mt => mt.Name == "Monstrosity");
                Constants.MTOoze = ctx.MonsterTypes.Single(mt => mt.Name == "Ooze");
                Constants.MTPlant = ctx.MonsterTypes.Single(mt => mt.Name == "Plant");
                Constants.MTUndead = ctx.MonsterTypes.Single(mt => mt.Name == "Undead");
            }
            else
            {
                Constants.MTAbberation = new MonsterType
                {
                    Name = "Abberation",
                    Description = "Aberrations are utterly alien beings. Many of them have innate magical Abilities drawn from the creature’s alien mind rather than the mystical forces of the world. The quintessential Aberrations are aboleths, Beholders, Mind Flayers, and slaadi."
                };
                Constants.MTBeast = new MonsterType
                {
                    Name = "Beast",
                    Description = "Beasts are nonhumanoid creatures that are a natural part of the fantasy ecology. Some of them have magical powers, but most are unintelligent and lack any society or language. Beasts include all varieties of ordinary animals, dinosaurs, and giant versions of animals."
                };
                Constants.MTCelestial = new MonsterType
                {
                    Name = "Celestial",
                    Description = "Celestials are creatures native to the Upper Planes. Many of them are the servants of deities, employed as messengers or agents in the mortal realm and throughout the planes. Celestials are good by Nature, so the exceptional Celestial who strays from a good alignment is a horrifying rarity. Celestials include angels, couatls, and Pegasi."
                };
                Constants.MTConstruct = new MonsterType
                {
                    Name = "Construct",
                    Description = "Constructs are made, not born. Some are programmed by their creators to follow a simple set of instructions, while others are imbued with sentience and capable of independent thought. Golems are the iconic constructs. Many creatures native to the outer plane of Mechanus, such as modrons, are constructs shaped from the raw material of the plane by the will of more powerful creatures."
                };
                Constants.MTDragon = new MonsterType
                {
                    Name = "Dragon",
                    Description = "Dragons are large reptilian creatures of ancient Origin and tremendous power. True Dragons, including the good metallic Dragons and the evil chromatic Dragons, are highly intelligent and have innate magic. Also in this category are creatures distantly related to true Dragons, but less powerful, less intelligent, and less magical, such as wyverns and pseudodragons."
                };
                Constants.MTElemental = new MonsterType
                {
                    Name = "Elemental",
                    Description = "Elementals are creatures native to the elemental planes. Some creatures of this type are little more than animate masses of their respective elements, including the creatures simply called Elementals. Others have biological forms infused with elemental energy. The races of genies, including djinn and efreet, form the most important civilizations on the elemental planes. Other elemental creatures include azers, and Invisible stalkers."
                };
                Constants.MTFey = new MonsterType
                {
                    Name = "Fey",
                    Description = "Fey are magical creatures closely tied to the forces of Nature. They dwell in twilight groves and misty forests. In some worlds, they are closely tied to the Feywild, also called the Plane of Faerie. Some are also found in the Outer Planes, particularly the planes of Arborea and the Beastlands. Fey include dryads, pixies, and satyrs."
                };
                Constants.MTFiend = new MonsterType
                {
                    Name = "Fiend",
                    Description = "Fiends are creatures of wickedness that are native to the Lower Planes. A few are the servants of deities, but many more labor under the leadership of Archdevils and demon princes. Evil Priests and mages sometimes summon Fiends to the material world to do their bidding. If an evil Celestial is a rarity, a good fiend is almost inconceivable. Fiends include Demons, devils, hell hounds, rakshasas, and yugoloths."
                };
                Constants.MTGiant = new MonsterType
                {
                    Name = "Giant",
                    Description = "Giants tower over humans and their kind. They are humanlike in shape, though some have multiple heads (ettins) or deformities (fomorians). The Six varieties of true giant are Hill Giants, Stone Giants, Frost Giants, Fire Giants, Cloud Giants, and Storm Giants. Besides these, creatures such as ogres and Trolls are Giants."
                };
                Constants.MTHumanoid = new MonsterType
                {
                    Name = "Humanoid",
                    Description = "Humanoids are the main peoples of a fantasy gaming world, both civilized and savage, including humans and a tremendous variety of other species. They have language and culture, few if any innate magical Abilities (though most humanoids can learn spellcasting), and a bipedal form. The most Common humanoid races are the ones most suitable as player characters: humans, Dwarves, elves, and Halflings. Almost as numerous but far more savage and brutal, and almost uniformly evil, are the races of Goblinoids (goblins, Hobgoblins, and bugbears), orcs, Gnolls, Lizardfolk, and Kobolds."
                };
                Constants.MTMonstrosity = new MonsterType
                {
                    Name = "Monstrosity",
                    Description = "Monstrosities are Monsters in the strictest sense—frightening creatures that are not ordinary, not truly natural, and almost never benign. Some are the results of magical experimentation gone awry (such as owlbears), and others are the product of terrible curses (including minotaurs and yuan-ti). They defy categorization, and in some sense serve as a catch-all category for creatures that don’t fit into any other type."
                };
                Constants.MTOoze = new MonsterType
                {
                    Name = "Ooze",
                    Description = "Oozes are gelatinous creatures that rarely have a fixed shape. They are mostly subterranean, dwelling in caves and dungeons and feeding on refuse, carrion, or creatures unlucky enough to get in their way. Black puddings and gelatinous cubes are among the most recognizable oozes."
                };
                Constants.MTPlant = new MonsterType
                {
                    Name = "Plant",
                    Description = "Plants in this context are vegetable creatures, not ordinary flora. Most of them are ambulatory, and some are carnivorous. The quintessential Plants are the Shambling Mound and the Treant. Fungal creatures such as the Gas Spore and the myconid also fall into this category."
                };
                Constants.MTUndead = new MonsterType
                {
                    Name = "Undead",
                    Description = "Undead are once-living creatures brought to a horrifying state of undeath through the practice of necromantic magic or some unholy curse. Undead include walking corpses, such as vampires and Zombies, as well as bodiless spirits, such as ghosts and specters."
                };

                ctx.MonsterTypes.AddRange
                (
                    Constants.MTAbberation,
                    Constants.MTBeast,
                    Constants.MTCelestial,
                    Constants.MTConstruct,
                    Constants.MTDragon,
                    Constants.MTElemental,
                    Constants.MTFey,
                    Constants.MTFiend,
                    Constants.MTGiant,
                    Constants.MTHumanoid,
                    Constants.MTMonstrosity,
                    Constants.MTOoze,
                    Constants.MTPlant,
                    Constants.MTUndead
                );
            }
        }
        private void CreateMonsterTags(ApplicationDbContext ctx)
        {
            Constants.TElf = new Tag { Name = "Elf" };
            Constants.THuman = new Tag { Name = "Human" };

            ctx.Tags.AddRange
            (
                Constants.TElf,
                Constants.THuman
            );
        }

        private List<Monster> CreateDandDMonsters(ApplicationDbContext ctx, Campaign pota,
            AlignmentData alignments, DiceRollData diceRolls, ArmorData armors, LanguageData languages,
            SkillData skills, PlayerClassData classes, SpellData spells)
        {
            return new List<Monster>
            {
                CreateAerisi(ctx, alignments, diceRolls, pota, languages, skills, classes.Wizard, spells),
                CreateThurl(ctx, alignments, diceRolls, pota, languages, skills, classes.Sorcerer, spells, armors)
            };
        }
        private Monster CreateAerisi(ApplicationDbContext ctx, AlignmentData a, DiceRollData dr,
            Campaign pota, LanguageData languages, SkillData skills, PlayerClass wizard,
            SpellData sd)
        {
            var abilityScores = new AbilityScores
            {
                Strength = 8,
                Dexterity = 16,
                Constitution = 12,
                Intelligence = 17,
                Wisdom = 10,
                Charisma = 16
            };

            var windvane = new Attack
            {
                HitEffects = new List<HitEffect>
                {
                    new HitEffect
                    {
                        Condition = "if used with two hands to make a melee attack",
                        Damage = dr.OneDEight,
                        DamageType = Constants.DTPiercing
                    },
                    new HitEffect
                    {
                        Condition = "",
                        Damage = dr.OneDSix,
                        DamageType = Constants.DTPiercing
                    },
                    new HitEffect
                    {
                        Damage = dr.OneDSix,
                        DamageType = Constants.DTLightning
                    }
                },
                Action = new Action
                {
                    Name = "Windvane"
                }
            };
            var actionSet = new ActionsSet
            {
                Actions = new List<Action>
                {
                    windvane.Action
                }
            };
            var ac = new ArmorClass
            {
                NaturalArmorModifier = 2
            };
            var mv = new MonsterMovement
            {
                Ground = 30
            };
            var basicStats = new BasicStatsSet
            {
                AC = ac,
                HPDice = dr.TwelveDEight,
                Movement = mv
            };
            var legendaryActions = new LegendaryActionsSet
            {
                LairActions = new List<Action>
                {
                    new Action
                    {
                        Name = "Free Spell",
                        Description = "<p>If Aerisi is in the air node while Yan-C-Bin isn't, Aerisi can take lair actions. On initiative count 20 (losing initiative ties), Aerisi uses a lair action to cast one of her spells, up to 3rd level, without using components or a spell slot. She can't cast the same spell two rounds in a row, although she can continue to concentrate on a spell she previously cast using a lair action. Aerisi can take no other lair actions while concentrating on a spell cast as a lair action.</p><p>If Aerisi casts invisibility using this lair action, she also draws the power of the air node into herself. By doing so, she regains 15 (3d8 + 2) hit points.</p>"
                    }
                }
            };
            var optional = new OptionalStatsSet
            {
                Effectivenesses = new DamageEffectivenessSet
                {
                    Resistances = new int[1] { Constants.DTLightning }
                },
                Languages = new Monsters.OptionalStats.Languages.MonsterLanguageSet { },
                Senses = new Senses
                {
                    Darkvision = 60
                }
            };
            var spells = new Monsters.SpecialTraits.Spellcasting.Spellcaster
            {
                SpellcasterLevel = 12,
                SpellcastingClass = wizard,
                SpellsPerDay = new int[9] { 4, 3, 3, 3, 2, 1, 0, 0, 0 },
                Spellcasting = new Monsters.SpecialTraits.Spellcasting.MonsterSpellcasting
                {
                    SpellcastingAbility = Constants.AInt,
                    SpellcastingType = Constants.SCTSpellcaster,
                }
            };
            var traits = new SpecialTraitSet
            {
                SpecialTraits = new List<SpecialTrait>
                {
                    new SpecialTrait
                    {
                        Name = "Fey Ancestry",
                        Description = "Aerisi has advantage on saving throws against being charmed, and magic can't put her to sleep."
                    },
                    new SpecialTrait
                    {
                        Name = "Howling Defeat",
                        Description = "When Aerisi drops to 0 hit points, her body disappears in a howling whirlwind that disperses quickly and harmlessly. Anything she is wearing or carrying is left behind."
                    },
                    new SpecialTrait
                    {
                        Name = "Legendary Resistance (2/Day)",
                        Description = "If Aerisi fails a saving throw, she can choose to succeed instead."
                    }
                },
                SpellcastingModel = spells.Spellcasting
            };

            var aerisi = new Monster
            {
                AbilityScores = abilityScores,
                ActionSet = actionSet,
                Alignment = a.NeutralEvil,
                BasicStats = basicStats,
                Campaign = pota,
                LegendaryActions = legendaryActions,
                Name = "Aerisi Kalinoth",
                Type = Constants.MTHumanoid,
                OptionalStats = optional,
                Size = Constants.SMedium,
                SpecialTraitSet = traits,
            };

            ctx.Monsters.Add(aerisi);

            ctx.MonsterLanguages.AddRange
            (
                new Monsters.OptionalStats.Languages.MonsterLanguage
                {
                    Language = languages.Auran,
                    MonsterLanguageSet = optional.Languages
                },
                new Monsters.OptionalStats.Languages.MonsterLanguage
                {
                    Language = languages.Common,
                    MonsterLanguageSet = optional.Languages
                },
                new Monsters.OptionalStats.Languages.MonsterLanguage
                {
                    Language = languages.Elvish,
                    MonsterLanguageSet = optional.Languages
                }
            );

            ctx.MonsterSkillSets.AddRange
            (
                new MonsterSkillSet
                {
                    OptionalStats = optional,
                    Skill = skills.Arcana
                },
                new MonsterSkillSet
                {
                    OptionalStats = optional,
                    Skill = skills.History
                },
                new MonsterSkillSet
                {
                    OptionalStats = optional,
                    Skill = skills.Perception
                }
            );

            ctx.SpellcasterSpells.AddRange
            (
                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.ChainLightning
                },
                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.Seeming
                },
                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.Cloudkill
                },
                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.IceStorm
                },
                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.StormSphere
                },
                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.LightningBolt
                },
                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.GaseousForm
                },
                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.Fly
                },
                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.DustDevil
                },
                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.GustOfWind
                },
                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.Invisibility
                },
                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.Thunderwave
                },
                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.MageArmor
                },
                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.FeatherFall
                },
                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.CharmPerson
                },
                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.ShockingGrasp
                },
                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.RayOfFrost
                },
                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.Prestidigitation
                },
                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.Message
                },
                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.MageHand
                },
                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.Gust
                });

            ctx.MonsterTags.Add
            (
                new MonsterTag
                {
                    Monster = aerisi,
                    Tag = Constants.TElf
                }
            );

            return aerisi;
        }
        private Monster CreateThurl(ApplicationDbContext ctx, AlignmentData a, DiceRollData dr,
            Campaign pota, LanguageData languages, SkillData skills, PlayerClass sorcerer,
            SpellData sd, ArmorData ad)
        {
            var abilityScores = new AbilityScores
            {
                Strength = 16,
                Dexterity = 14,
                Constitution = 14,
                Intelligence = 11,
                Wisdom = 10,
                Charisma = 15
            };

            var greatswordAttack = new Attack
            {
                Action = new Action
                {
                    Name = "Greatsword"
                },
                Type = Constants.AMelee,
                Target = Constants.TTarget,
                HitEffects = new List<HitEffect>
                {
                    new HitEffect
                    {
                        Damage = dr.TwoDSix,
                        DamageType = Constants.DTSlashing,
                    }
                }
            };

            var lanceAttack = new Attack
            {
                Action = new Action
                {
                    Name = "Lance"
                },
                Type = Constants.AMelee,
                HitEffects = new List<HitEffect>
                {
                    new HitEffect
                    {
                        Damage = dr.OneDTwelve,
                        DamageType = Constants.DTPiercing
                    }
                },
                Range = 10,
                Target = Constants.TTarget
            };

            var actionSet = new ActionsSet
            {
                Actions = new List<Action>
                {
                    greatswordAttack.Action,
                    lanceAttack.Action
                },
                Multiattack = "Thurl makes two melee attacks.",
                Reactions = new List<Action>
                {
                    new Action
                    {
                        Name = "Parry",
                        Description = "Thurl adds 2 to his AC against one melee attack that would hit him. To do so, Thurl must see the attacker and be wielding a melee weapon."
                    }
                }
            };
            var ac = new ArmorClass
            {
            };
            var mv = new MonsterMovement
            {
                Ground = 30
            };
            var basicStats = new BasicStatsSet
            {
                AC = ac,
                HPDice = dr.ElevenDEight,
                Movement = mv
            };
            var optional = new OptionalStatsSet
            {
                Languages = new Monsters.OptionalStats.Languages.MonsterLanguageSet { },
            };
            var spells = new Monsters.SpecialTraits.Spellcasting.Spellcaster
            {
                SpellcasterLevel = 5,
                SpellcastingClass = sorcerer,
                SpellsPerDay = new int[9] { 4, 3, 2, 0, 0, 0, 0, 0, 0 },
                Spellcasting = new Monsters.SpecialTraits.Spellcasting.MonsterSpellcasting
                {
                    SpellcastingAbility = Constants.ACha,
                    SpellcastingType = Constants.SCTSpellcaster,
                }
            };
            var traits = new SpecialTraitSet
            {
                SpellcastingModel = spells.Spellcasting
            };

            var thurl = new Monster
            {
                AbilityScores = abilityScores,
                ActionSet = actionSet,
                Alignment = a.LawfulEvil,
                BasicStats = basicStats,
                Campaign = pota,
                Name = "Thurl Merosska",
                Type = Constants.MTHumanoid,
                OptionalStats = optional,
                Size = Constants.SMedium,
                SpecialTraitSet = traits,
            };

            ctx.Monsters.Add(thurl);

            ctx.MonsterLanguages.AddRange
            (
                new Monsters.OptionalStats.Languages.MonsterLanguage
                {
                    Language = languages.Auran,
                    MonsterLanguageSet = optional.Languages
                },
                new Monsters.OptionalStats.Languages.MonsterLanguage
                {
                    Language = languages.Common,
                    MonsterLanguageSet = optional.Languages
                }
            );

            ctx.MonsterSkillSets.AddRange
            (
                new MonsterSkillSet
                {
                    OptionalStats = optional,
                    Skill = skills.AnimalHandling
                },
                new MonsterSkillSet
                {
                    OptionalStats = optional,
                    Skill = skills.Athletics
                },
                new MonsterSkillSet
                {
                    OptionalStats = optional,
                    Skill = skills.Deception
                },
                new MonsterSkillSet
                {
                    OptionalStats = optional,
                    Skill = skills.Persuasion
                }
            );

            ctx.SpellcasterSpells.AddRange
            (
                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.Haste
                },

                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.MistyStep
                },
                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.Levitate
                },
                
                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.ExpeditiousRetreat
                },
                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.FeatherFall
                },
                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.Jump
                },

                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.Friends
                },
                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.Gust
                },
                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.Light
                },
                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.Message
                },
                new Monsters.SpecialTraits.Spellcasting.SpellcasterSpells
                {
                    Spellcaster = spells,
                    Spell = sd.RayOfFrost
                });

            ctx.MonsterTags.Add
            (
                new MonsterTag
                {
                    Monster = thurl,
                    Tag = Constants.THuman
                }
            );

            ctx.ArmorClassArmors.Add(new ArmorClassArmor
            {
                ArmorClass = ac,
                Armor = ad.Breastplate
            });

            return thurl;
        }

        private List<Monster> CreatePathfinderMonsters()
        {
            return new List<Monster>();
        }
    }
}
