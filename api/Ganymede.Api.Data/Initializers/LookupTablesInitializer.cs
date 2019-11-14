using Ganymede.Api.Data.Common;
using Ganymede.Api.Data.Initializers.InitializerData;
using System.Linq;

namespace Ganymede.Api.Data.Initializers
{
    internal class LookupTablesInitializer
    {
        public void Initialize(ApplicationDbContext ctx, out AlignmentData alignments, out DiceRollData diceRolls,
            out LanguageData languages, out SkillData skills)
        {
            if (ctx.Alignments.Any() && ctx.DiceRolls.Any() && ctx.Languages.Any() && ctx.Skills.Any())
                LoadLookups(ctx, out alignments, out diceRolls, out languages, out skills);
            else
                CreateLookups(ctx, out alignments, out diceRolls, out languages, out skills);
        }

        private void LoadLookups(ApplicationDbContext ctx, out AlignmentData alignments, out DiceRollData diceRolls,
            out LanguageData languages, out SkillData skills)
        {
            alignments = new AlignmentData
            {
                LawfulGood = ctx.Alignments.Single(a => a.Ethics == 0 && a.Morals == 0),
                LawfulNeutral = ctx.Alignments.Single(a => a.Ethics == 0 && a.Morals == 1),
                LawfulEvil = ctx.Alignments.Single(a => a.Ethics == 0 && a.Morals == 2),
                NeutralGood = ctx.Alignments.Single(a => a.Ethics == 1 && a.Morals == 0),
                Neutral = ctx.Alignments.Single(a => a.Ethics == 1 && a.Morals == 1),
                NeutralEvil = ctx.Alignments.Single(a => a.Ethics == 1 && a.Morals == 2),
                ChaoticGood = ctx.Alignments.Single(a => a.Ethics == 2 && a.Morals == 0),
                ChaoticNeutral = ctx.Alignments.Single(a => a.Ethics == 2 && a.Morals == 1),
                ChaoticEvil = ctx.Alignments.Single(a => a.Ethics == 2 && a.Morals == 2)
            };

            diceRolls = new DiceRollData
            {
                OneDFour = ctx.DiceRolls.Single(dr => dr.Number == 1 && dr.Sides == 4),
                OneDSix = ctx.DiceRolls.Single(dr => dr.Number == 1 && dr.Sides == 6),
                OneDEight = ctx.DiceRolls.Single(dr => dr.Number == 1 && dr.Sides == 8),
                OneDTen = ctx.DiceRolls.Single(dr => dr.Number == 1 && dr.Sides == 10),
                OneDTwelve = ctx.DiceRolls.Single(dr => dr.Number == 1 && dr.Sides == 12),
                OneDTwenty = ctx.DiceRolls.Single(dr => dr.Number == 1 && dr.Sides == 20),
                TwoDSix = ctx.DiceRolls.Single(dr => dr.Number == 2 && dr.Sides == 6),
                ElevenDEight = ctx.DiceRolls.Single(dr => dr.Number == 11 && dr.Sides == 8),
                TwelveDEight = ctx.DiceRolls.Single(dr => dr.Number == 12 && dr.Sides == 8),
            };

            languages = new LanguageData
            {
                Abyssal = ctx.Languages.Single(l => l.Name == "Abyssal"),
                Auran = ctx.Languages.Single(l => l.Name == "Auran"),
                Celestial = ctx.Languages.Single(l => l.Name == "Celestial"),
                Common = ctx.Languages.Single(l => l.Name == "Common"),
                DeepSpeech = ctx.Languages.Single(l => l.Name == "Deep Speech"),
                Draconic = ctx.Languages.Single(l => l.Name == "Draconic"),
                Dwarvish = ctx.Languages.Single(l => l.Name == "Dwarvish"),
                Elvish = ctx.Languages.Single(l => l.Name == "Elvish"),
                Giant = ctx.Languages.Single(l => l.Name == "Giant"),
                Gnomish = ctx.Languages.Single(l => l.Name == "Gnomish"),
                Goblin = ctx.Languages.Single(l => l.Name == "Goblin"),
                Halfling = ctx.Languages.Single(l => l.Name == "Halfling"),
                Infernal = ctx.Languages.Single(l => l.Name == "Infernal"),
                Orc = ctx.Languages.Single(l => l.Name == "Orc"),
                Primordial =ctx.Languages.Single(l => l.Name == "Primordial"),
                Sylvan =ctx.Languages.Single(l => l.Name == "Sylvan"),
                Undercommon =ctx.Languages.Single(l => l.Name == "Undercommon")
            };

            skills = new SkillData
            {
                Acrobatics = ctx.Skills.Single(s => s.Ability == "Dexterity" && s.Name =="Acrobatics"),
                AnimalHandling = ctx.Skills.Single(s => s.Ability == "Wisdom" && s.Name =="Animal Handling"),
                Arcana = ctx.Skills.Single(s => s.Ability == "Intelligence" && s.Name =="Arcana"),
                Athletics = ctx.Skills.Single(s => s.Ability == "Strength" && s.Name =="Athletics"),
                Deception = ctx.Skills.Single(s => s.Ability == "Charisma" && s.Name =="Deception"),
                History = ctx.Skills.Single(s => s.Ability == "Intelligence" && s.Name =="History"),
                Insight = ctx.Skills.Single(s => s.Ability == "Wisdom" && s.Name == "Insight"),
                Intimidation = ctx.Skills.Single(s => s.Ability == "Charisma" && s.Name =="Intimidation"),
                Investigation = ctx.Skills.Single(s => s.Ability == "Intelligence" && s.Name =="Investigation"),
                Medicine = ctx.Skills.Single(s => s.Ability == "Wisdom" && s.Name =="Medicine"),
                Nature = ctx.Skills.Single(s => s.Ability == "Intelligence" && s.Name =="Nature"),
                Perception = ctx.Skills.Single(s => s.Ability == "Wisdom" && s.Name =="Perception"),
                Performance = ctx.Skills.Single(s => s.Ability == "Charisma" && s.Name =="Performance"),
                Persuasion = ctx.Skills.Single(s => s.Ability == "Charisma" && s.Name =="Persuasion"),
                Religion = ctx.Skills.Single(s => s.Ability == "Intelligence" && s.Name =="Religion"),
                SleightOfHand = ctx.Skills.Single(s => s.Ability == "Dexterity" && s.Name =="Sleight of Hand"),
                Stealth = ctx.Skills.Single(s => s.Ability == "Dexterity" && s.Name =="Stealth"),
                Survival = ctx.Skills.Single(s => s.Ability == "Wisdom" && s.Name =="Survival")
            };
        }
        private void CreateLookups(ApplicationDbContext ctx, out AlignmentData alignments, out DiceRollData diceRolls,
            out LanguageData languages, out SkillData skills)
        {
            alignments = new AlignmentData
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
            diceRolls = new DiceRollData
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
                ElevenDEight = new DiceRoll
                {
                    Number = 11,
                    Sides = 8
                },
                TwelveDEight = new DiceRoll
                {
                    Number = 12,
                    Sides = 8
                }
            };
            languages = new LanguageData
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
            skills = new SkillData
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
                languages.Abyssal,
                languages.Auran,
                languages.Celestial,
                languages.Common,
                languages.DeepSpeech,
                languages.Draconic,
                languages.Dwarvish,
                languages.Elvish,
                languages.Giant,
                languages.Gnomish,
                languages.Goblin,
                languages.Halfling,
                languages.Orc,
                languages.Abyssal,
                languages.Auran,
                languages.Celestial,
                languages.Draconic,
                languages.DeepSpeech,
                languages.Infernal,
                languages.Primordial,
                languages.Sylvan,
                languages.Undercommon
            );

            ctx.Skills.AddRange
            (
                skills.Acrobatics,
                skills.AnimalHandling,
                skills.Arcana,
                skills.Athletics,
                skills.Deception,
                skills.History,
                skills.Insight,
                skills.Intimidation,
                skills.Investigation,
                skills.Medicine,
                skills.Nature,
                skills.Perception,
                skills.Performance,
                skills.Persuasion,
                skills.Religion,
                skills.SleightOfHand,
                skills.Stealth,
                skills.Survival
            );
        }
    }
}
