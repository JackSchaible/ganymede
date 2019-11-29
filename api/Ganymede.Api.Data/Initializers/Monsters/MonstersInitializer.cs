using Ganymede.Api.Data.Characters;
using Ganymede.Api.Data.Common;
using Ganymede.Api.Data.Initializers.InitializerData;
using Ganymede.Api.Data.Initializers.Monsters.DandD;
using Ganymede.Api.Data.Initializers.Monsters.DandD.Implementations;
using Ganymede.Api.Data.Monsters;
using Ganymede.Api.Data.Monsters.Actions;
using Ganymede.Api.Data.Monsters.BasicStats;
using Ganymede.Api.Data.Monsters.OptionalStats;
using Ganymede.Api.Data.Monsters.OptionalStats.Languages;
using Ganymede.Api.Data.Monsters.SpecialTraits;
using Ganymede.Api.Data.Monsters.SpecialTraits.Spellcasting;
using System.Collections.Generic;
using System.Linq;

namespace Ganymede.Api.Data.Initializers.Monsters
{
    internal class MonstersInitializer
    {
        internal static class MonstersConstants
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

            public const int WAMelee = 0;
            public const int WARanged = 1;

            public static Tag TElf;
            public static Tag THuman;
            public static Tag TAnyRace;

            public const int CBlinded = 0;
            public const int CCharmed = 1;
            public const int CDeafened = 2;
            public const int CFatigues = 3;
            public const int CFrightened = 4;
            public const int CGrappled = 5;
            public const int CIncapacitated = 6;
            public const int CInvisible = 7;
            public const int CParalyzed = 8;
            public const int CPetrified = 9;
            public const int CPoisoned = 10;
            public const int CProne = 11;
            public const int CRestrained = 12;
            public const int CStunned = 13;
            public const int CUnconscious = 14;

            public const int RCRoll = 0;
            public const int RCLongRest = 1;
            public const int RCShortRest = 2;
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

        private List<Monster> CreateDandDMonsters(ApplicationDbContext ctx, Campaign pota,
            AlignmentData alignments, DiceRollData diceRolls, ArmorData armors, LanguageData languages,
            SkillData skills, PlayerClassData classes, SpellData spells)
        {
            var data = new MonsterInitializationData
            {
                Alignments = alignments,
                Armors = armors,
                Classes = classes,
                DiceRolls = diceRolls,
                Languages = languages,
                PrincesOfTheApocalypse = pota,
                Skills = skills,
                Spells = spells
            };

            return new List<Monster>
            {
                new Aerisi(data).CreateMonster(ctx),
                new Thurl(data).CreateMonster(ctx),
                new Hydra(data).CreateMonster(ctx),
                new Bandit(data).CreateMonster(ctx),
                new Beholder(data).CreateMonster(ctx)
            };
        }

        private void CreateMonsterTypes(ApplicationDbContext ctx)
        {
            if (ctx.MonsterTypes.Any())
            {
                MonstersConstants.MTAbberation = ctx.MonsterTypes.Single(mt => mt.Name == "Abberation");
                MonstersConstants.MTBeast = ctx.MonsterTypes.Single(mt => mt.Name == "Beast");
                MonstersConstants.MTCelestial = ctx.MonsterTypes.Single(mt => mt.Name == "Celestial");
                MonstersConstants.MTConstruct = ctx.MonsterTypes.Single(mt => mt.Name == "Construct");
                MonstersConstants.MTDragon = ctx.MonsterTypes.Single(mt => mt.Name == "Dragon");
                MonstersConstants.MTElemental = ctx.MonsterTypes.Single(mt => mt.Name == "Elemental");
                MonstersConstants.MTFey = ctx.MonsterTypes.Single(mt => mt.Name == "Fiend");
                MonstersConstants.MTFiend = ctx.MonsterTypes.Single(mt => mt.Name == "Fey");
                MonstersConstants.MTGiant = ctx.MonsterTypes.Single(mt => mt.Name == "Giant");
                MonstersConstants.MTHumanoid = ctx.MonsterTypes.Single(mt => mt.Name == "Humanoid");
                MonstersConstants.MTMonstrosity = ctx.MonsterTypes.Single(mt => mt.Name == "Monstrosity");
                MonstersConstants.MTOoze = ctx.MonsterTypes.Single(mt => mt.Name == "Ooze");
                MonstersConstants.MTPlant = ctx.MonsterTypes.Single(mt => mt.Name == "Plant");
                MonstersConstants.MTUndead = ctx.MonsterTypes.Single(mt => mt.Name == "Undead");
            }
            else
            {
                MonstersConstants.MTAbberation = new MonsterType
                {
                    Name = "Abberation",
                    Description = "Aberrations are utterly alien beings. Many of them have innate magical Abilities drawn from the creature’s alien mind rather than the mystical forces of the world. The quintessential Aberrations are aboleths, Beholders, Mind Flayers, and slaadi."
                };
                MonstersConstants.MTBeast = new MonsterType
                {
                    Name = "Beast",
                    Description = "Beasts are nonhumanoid creatures that are a natural part of the fantasy ecology. Some of them have magical powers, but most are unintelligent and lack any society or language. Beasts include all varieties of ordinary animals, dinosaurs, and giant versions of animals."
                };
                MonstersConstants.MTCelestial = new MonsterType
                {
                    Name = "Celestial",
                    Description = "Celestials are creatures native to the Upper Planes. Many of them are the servants of deities, employed as messengers or agents in the mortal realm and throughout the planes. Celestials are good by Nature, so the exceptional Celestial who strays from a good alignment is a horrifying rarity. Celestials include angels, couatls, and Pegasi."
                };
                MonstersConstants.MTConstruct = new MonsterType
                {
                    Name = "Construct",
                    Description = "Constructs are made, not born. Some are programmed by their creators to follow a simple set of instructions, while others are imbued with sentience and capable of independent thought. Golems are the iconic constructs. Many creatures native to the outer plane of Mechanus, such as modrons, are constructs shaped from the raw material of the plane by the will of more powerful creatures."
                };
                MonstersConstants.MTDragon = new MonsterType
                {
                    Name = "Dragon",
                    Description = "Dragons are large reptilian creatures of ancient Origin and tremendous power. True Dragons, including the good metallic Dragons and the evil chromatic Dragons, are highly intelligent and have innate magic. Also in this category are creatures distantly related to true Dragons, but less powerful, less intelligent, and less magical, such as wyverns and pseudodragons."
                };
                MonstersConstants.MTElemental = new MonsterType
                {
                    Name = "Elemental",
                    Description = "Elementals are creatures native to the elemental planes. Some creatures of this type are little more than animate masses of their respective elements, including the creatures simply called Elementals. Others have biological forms infused with elemental energy. The races of genies, including djinn and efreet, form the most important civilizations on the elemental planes. Other elemental creatures include azers, and Invisible stalkers."
                };
                MonstersConstants.MTFey = new MonsterType
                {
                    Name = "Fey",
                    Description = "Fey are magical creatures closely tied to the forces of Nature. They dwell in twilight groves and misty forests. In some worlds, they are closely tied to the Feywild, also called the Plane of Faerie. Some are also found in the Outer Planes, particularly the planes of Arborea and the Beastlands. Fey include dryads, pixies, and satyrs."
                };
                MonstersConstants.MTFiend = new MonsterType
                {
                    Name = "Fiend",
                    Description = "Fiends are creatures of wickedness that are native to the Lower Planes. A few are the servants of deities, but many more labor under the leadership of Archdevils and demon princes. Evil Priests and mages sometimes summon Fiends to the material world to do their bidding. If an evil Celestial is a rarity, a good fiend is almost inconceivable. Fiends include Demons, devils, hell hounds, rakshasas, and yugoloths."
                };
                MonstersConstants.MTGiant = new MonsterType
                {
                    Name = "Giant",
                    Description = "Giants tower over humans and their kind. They are humanlike in shape, though some have multiple heads (ettins) or deformities (fomorians). The Six varieties of true giant are Hill Giants, Stone Giants, Frost Giants, Fire Giants, Cloud Giants, and Storm Giants. Besides these, creatures such as ogres and Trolls are Giants."
                };
                MonstersConstants.MTHumanoid = new MonsterType
                {
                    Name = "Humanoid",
                    Description = "Humanoids are the main peoples of a fantasy gaming world, both civilized and savage, including humans and a tremendous variety of other species. They have language and culture, few if any innate magical Abilities (though most humanoids can learn spellcasting), and a bipedal form. The most Common humanoid races are the ones most suitable as player characters: humans, Dwarves, elves, and Halflings. Almost as numerous but far more savage and brutal, and almost uniformly evil, are the races of Goblinoids (goblins, Hobgoblins, and bugbears), orcs, Gnolls, Lizardfolk, and Kobolds."
                };
                MonstersConstants.MTMonstrosity = new MonsterType
                {
                    Name = "Monstrosity",
                    Description = "Monstrosities are Monsters in the strictest sense—frightening creatures that are not ordinary, not truly natural, and almost never benign. Some are the results of magical experimentation gone awry (such as owlbears), and others are the product of terrible curses (including minotaurs and yuan-ti). They defy categorization, and in some sense serve as a catch-all category for creatures that don’t fit into any other type."
                };
                MonstersConstants.MTOoze = new MonsterType
                {
                    Name = "Ooze",
                    Description = "Oozes are gelatinous creatures that rarely have a fixed shape. They are mostly subterranean, dwelling in caves and dungeons and feeding on refuse, carrion, or creatures unlucky enough to get in their way. Black puddings and gelatinous cubes are among the most recognizable oozes."
                };
                MonstersConstants.MTPlant = new MonsterType
                {
                    Name = "Plant",
                    Description = "Plants in this context are vegetable creatures, not ordinary flora. Most of them are ambulatory, and some are carnivorous. The quintessential Plants are the Shambling Mound and the Treant. Fungal creatures such as the Gas Spore and the myconid also fall into this category."
                };
                MonstersConstants.MTUndead = new MonsterType
                {
                    Name = "Undead",
                    Description = "Undead are once-living creatures brought to a horrifying state of undeath through the practice of necromantic magic or some unholy curse. Undead include walking corpses, such as vampires and Zombies, as well as bodiless spirits, such as ghosts and specters."
                };

                ctx.MonsterTypes.AddRange
                (
                    MonstersConstants.MTAbberation,
                    MonstersConstants.MTBeast,
                    MonstersConstants.MTCelestial,
                    MonstersConstants.MTConstruct,
                    MonstersConstants.MTDragon,
                    MonstersConstants.MTElemental,
                    MonstersConstants.MTFey,
                    MonstersConstants.MTFiend,
                    MonstersConstants.MTGiant,
                    MonstersConstants.MTHumanoid,
                    MonstersConstants.MTMonstrosity,
                    MonstersConstants.MTOoze,
                    MonstersConstants.MTPlant,
                    MonstersConstants.MTUndead
                );
            }
        }
        private void CreateMonsterTags(ApplicationDbContext ctx)
        {
            MonstersConstants.TElf = new Tag { Name = "Elf" };
            MonstersConstants.THuman = new Tag { Name = "Human" };
            MonstersConstants.TAnyRace = new Tag { Name = "Any Race" };

            ctx.Tags.AddRange
            (
                MonstersConstants.TElf,
                MonstersConstants.THuman,
                MonstersConstants.TAnyRace
            );
        }

        private List<Monster> CreatePathfinderMonsters()
        {
            return new List<Monster>();
        }
    }
}
