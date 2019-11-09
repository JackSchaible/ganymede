using Ganymede.Api.Data.Common;
using Ganymede.Api.Data.Initializers.InitializerData;

namespace Ganymede.Api.Data.Initializers
{
    internal class LookupTablesInitializer
    {
        public void Initialize(ApplicationDbContext ctx, out Alignments alignments, out DiceRolls diceRolls, out Languages languages, out Skills skills)
        {
            alignments = new Alignments 
            {
                LawfulGood = new Monsters.Alignment
                {
                    Ethics = 0,
                    Morals = 0
                },
                LawfulNeutral = new Monsters.Alignment
                {
                    Ethics = 0,
                    Morals = 1
                },
                LawfulEvil = new Monsters.Alignment
                {
                    Ethics = 0,
                    Morals = 2
                },
                NeutralGood = new Monsters.Alignment
                {
                    Ethics = 1,
                    Morals = 0
                },
                Neutral = new Monsters.Alignment
                {
                    Ethics = 1,
                    Morals = 1
                },
                NeutralEvil = new Monsters.Alignment
                {
                    Ethics = 1,
                    Morals = 2
                },
                ChaoticGood = new Monsters.Alignment
                {
                    Ethics = 2,
                    Morals = 0
                },
                ChaoticNeutral = new Monsters.Alignment
                {
                    Ethics = 2,
                    Morals = 1
                },
                ChaoticEvil = new Monsters.Alignment
                {
                    Ethics = 2,
                    Morals = 2
                }
            };
            diceRolls = new DiceRolls
            {
                OneDFour = new DiceRoll
                {
                    Number = 1,
                    Sides = 4
                },
                OneDSix = new DiceRoll
                {
                    Number = 1,
                    Sides = 6
                },
                OneDEight = new DiceRoll
                {
                    Number = 1,
                    Sides = 8
                },
                OneDTen = new DiceRoll
                {
                    Number = 1,
                    Sides = 10
                },
                OneDTwelve = new DiceRoll
                {
                    Number = 1,
                    Sides = 12
                },
                OneDTwenty = new DiceRoll
                {
                    Number = 1,
                    Sides = 20
                },
                TwoDSix = new DiceRoll
                {
                    Number = 2,
                    Sides = 6
                },
                TwelveDEight = new DiceRoll
                {
                    Number = 12,
                    Sides = 8
                }
            };
            languages = new Languages
            {
                Abyssal = new Language
                {
                    Name = "Abyssal"
                },
                Auran = new Language
                {
                    Name = "Auran"
                },
                Celestial = new Language
                {
                    Name = "Celestial"
                },
                Common = new Language
                {
                    Name = "Common"
                },
                DeepSpeech = new Language
                {
                    Name = "Deep Speech"
                },
                Draconic = new Language
                {
                    Name = "Draconic"
                },
                Dwarvish = new Language
                {
                    Name = "Dwarvish"
                },
                Elvish = new Language
                {
                    Name = "Elvish"
                },
                Giant = new Language
                {
                    Name = "Giant"
                },
                Gnomish = new Language
                {
                    Name = "Gnomish"
                },
                Goblin = new Language
                {
                    Name = "Goblin"
                },
                Halfling = new Language
                {
                    Name = "Halfling"
                },
                Infernal = new Language
                {
                    Name = "Infernal"
                },
                Orc = new Language
                {
                    Name = "Orc"
                },
                Primordial = new Language
                {
                    Name = "Primordial"
                },
                Sylvan = new Language
                {
                    Name = "Sylvan"
                },
                Undercommon = new Language
                {
                    Name = "Undercommon"
                }
            };
            skills = new Skills
            {
                Acrobatics = new Skill
                {
                    Ability = "Dexterity",
                    Name = "Acrobatics"
                },
                AnimalHandling = new Skill
                {
                    Ability = "Wisdom",
                    Name = "Animal Handling"
                },
                Arcana = new Skill
                {
                    Ability = "Intelligence",
                    Name = "Arcana"
                },
                Athletics = new Skill
                {
                    Ability = "Strength",
                    Name = "Athletics"
                },
                Deception = new Skill
                {
                    Ability = "Charisma",
                    Name = "Deception"
                },
                History = new Skill
                {
                    Ability = "Intelligence",
                    Name = "History"
                },
                Insight = new Skill
                {
                    Ability = "Wisdom",
                    Name = "Insight"
                },
                Intimidation = new Skill
                {
                    Ability = "Charisma",
                    Name = "Intimidation"
                },
                Investigation = new Skill
                {
                    Ability = "Intelligence",
                    Name = "Investigation"
                },
                Medicine = new Skill
                {
                    Ability = "Wisdom",
                    Name = "Medicine"
                },
                Nature = new Skill
                {
                    Ability = "Intelligence",
                    Name = "Nature"
                },
                Perception = new Skill
                {
                    Ability = "Wisdom",
                    Name = "Perception"
                },
                Performance = new Skill
                {
                    Ability = "Charisma",
                    Name = "Performance"
                },
                Persuasion = new Skill
                {
                    Ability = "Charisma",
                    Name = "Persuasion"
                },
                Religion = new Skill
                {
                    Ability = "Intelligence",
                    Name = "Religion"
                },
                SleightOfHand = new Skill
                {
                    Ability = "Dexterity",
                    Name = "Sleight of Hand"
                },
                Stealth = new Skill
                {
                    Ability = "Dexterity",
                    Name = "Stealth"
                },
                Survival = new Skill
                {
                    Ability = "Wisdom",
                    Name = "Survival"
                }
            };

            ctx.Alignments.AddRange
            (
                alignments.LawfulGood,
                alignments.LawfulNeutral,
                alignments.LawfulEvil,
                alignments.NeutralGood,
                alignments.Neutral,
                alignments.NeutralEvil,
                alignments.ChaoticGood,
                alignments.ChaoticNeutral,
                alignments.ChaoticEvil
            );

            ctx.DiceRolls.AddRange
            (
                diceRolls.OneDFour,
                diceRolls.OneDSix,
                diceRolls.OneDEight,
                diceRolls.OneDTen,
                diceRolls.OneDTwelve,
                diceRolls.OneDTwenty,
                diceRolls.TwoDSix,
                diceRolls.TwelveDEight
            );

            ctx.Languages.AddRange
            (
                languages.Auran,
                languages.Common,
                languages.Elvish
            );
        }
    }
}
