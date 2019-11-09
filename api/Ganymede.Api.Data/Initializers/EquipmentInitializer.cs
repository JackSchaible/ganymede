using Ganymede.Api.Data.Initializers.InitializerData;

namespace Ganymede.Api.Data.Initializers
{
    internal class EquipmentInitializer
    {
        private static class Constants
        {
            public const int ATLight = 0;
            public const int ATMedium = 1;
            public const int ATHeavy = 2;
            public const int ATShield = 3;
        }

        public void Initialize(ApplicationDbContext ctx, out ArmorData armors)
        {
            armors = InitializeArmors(ctx);
        }

        private ArmorData InitializeArmors(ApplicationDbContext ctx)
        {
            var armors = new ArmorData
            {
                Padded = new Equipment.Armor
                {
                    AC = 11,
                    ArmorType = Constants.ATLight,
                    StealthDisadvantage = true,
                    Equipment = new Equipment.Equipment
                    {
                        Description = "Padded Armor consists of quilted layers of cloth and batting.",
                        Name = "Padded Armor",
                        PriceInGold = 5M,
                        WeightInPounds = 8M
                    }
                },
                Leather = new Equipment.Armor
                {
                    AC = 11,
                    ArmorType = Constants.ATLight,
                    Equipment = new Equipment.Equipment
                    {
                        Description = "The Breastplate and shoulder protectors of this armor are made of leather that has been stiffened by being boiled in oil. The rest of the armor is made of softer and more flexible materials.",
                        Name = "Leather Armor",
                        PriceInGold = 10M,
                        WeightInPounds = 10M
                    }
                },
                StuddedLeather = new Equipment.Armor
                {
                    AC = 12,
                    ArmorType = Constants.ATLight,
                    Equipment = new Equipment.Equipment
                    {
                        Description = "Made from tough but flexible leather, studded leather is reinforced with close-set rivets or spikes.",
                        Name = "Studded Leather Armor",
                        PriceInGold = 45M,
                        WeightInPounds = 13M
                    }
                },
                Hide = new Equipment.Armor
                {
                    AC = 12,
                    ArmorType = Constants.ATMedium,
                    Equipment = new Equipment.Equipment
                    {
                        Description = "This crude armor consists of thick furs and pelts. It is commonly worn by Barbarian tribes, evil humanoids, and other folk who lack access to the tools and materials needed to create better armor.",
                        Name = "Hide Armor",
                        PriceInGold = 10M,
                        WeightInPounds = 12M
                    }
                },
                ChainShirt = new Equipment.Armor
                {
                    AC = 13,
                    ArmorType = Constants.ATMedium,
                    Equipment = new Equipment.Equipment
                    {
                        Description = "Made of interlocking metal rings, a Chain Shirt is worn between layers of clothing or leather. This armor offers modest Protection to the wearer’s upper body and allows the sound of the rings rubbing against one another to be muffled by outer layers.",
                        Name = "Chain Shirt",
                        PriceInGold = 50M,
                        WeightInPounds = 20M
                    }
                },
                ScaleMail = new Equipment.Armor
                {
                    AC = 14,
                    ArmorType = Constants.ATMedium,
                    StealthDisadvantage = true,
                    Equipment = new Equipment.Equipment
                    {
                        Description = "This armor consists of a coat and leggings (and perhaps a separate skirt) of leather covered with overlapping pieces of metal, much like the scales of a fish. The suit includes gauntlets.",
                        Name = "Scale Mail",
                        PriceInGold = 50M,
                        WeightInPounds = 45M
                    }
                },
                Breastplate = new Equipment.Armor
                {
                    AC = 14,
                    ArmorType = Constants.ATMedium,
                    Equipment = new Equipment.Equipment
                    {
                        Description = "This armor consists of a fitted metal chest piece worn with supple leather. Although it leaves the legs and arms relatively unprotected, this armor provides good Protection for the wearer’s vital organs while leaving the wearer relatively unencumbered.",
                        Name = "Brestplate Armor",
                        PriceInGold = 400M,
                        WeightInPounds = 20M
                    }
                },
                HalfPlate = new Equipment.Armor
                {
                    AC = 15,
                    ArmorType = Constants.ATMedium,
                    StealthDisadvantage = true,
                    Equipment = new Equipment.Equipment
                    {
                        Description = "Half Plate consists of shaped metal plates that cover most of the wearer’s body. It does not include leg Protection beyond simple greaves that are attached with leather straps.",
                        Name = "Half Plate Armor",
                        PriceInGold = 750M,
                        WeightInPounds = 40M
                    }
                },
                RingMail = new Equipment.Armor
                {
                    AC = 14,
                    ArmorType = Constants.ATHeavy,
                    StealthDisadvantage = true,
                    Equipment = new Equipment.Equipment
                    {
                        Description = "This armor is Leather Armor with heavy rings sewn into it. The rings help reinforce the armor against blows from Swords and axes. Ring Mail is inferior to Chain Mail, and it's usually worn only by those who can’t afford better armor.",
                        Name = "Ring Mail Armor",
                        PriceInGold = 30M,
                        WeightInPounds = 40M
                    }
                },
                ChainMail = new Equipment.Armor
                {
                    AC = 16,
                    ArmorType = Constants.ATHeavy,
                    StealthDisadvantage = true,
                    StrengthRequirement = 13,
                    Equipment = new Equipment.Equipment
                    {
                        Description = "Made of interlocking metal rings, Chain Mail includes a layer of quilted fabric worn underneath the mail to prevent chafing and to cushion the impact of blows. The suit includes gauntlets.",
                        Name = "Chain Mail Armor",
                        PriceInGold = 75M,
                        WeightInPounds = 55M
                    }
                },
                Splint = new Equipment.Armor
                {
                    AC = 17,
                    ArmorType = Constants.ATHeavy,
                    StealthDisadvantage = true,
                    StrengthRequirement = 15,
                    Equipment = new Equipment.Equipment
                    {
                        Description = "This armor is made of narrow vertical strips of metal riveted to a backing of leather that is worn over cloth padding. Flexible Chain Mail protects the joints.",
                        Name = "Splint Armor",
                        PriceInGold = 200M,
                        WeightInPounds = 60M
                    }
                },
                Plate = new Equipment.Armor
                {
                    AC = 18,
                    ArmorType = Constants.ATHeavy,
                    StealthDisadvantage = true,
                    StrengthRequirement = 15,
                    Equipment = new Equipment.Equipment
                    {
                        Description = "Plate consists of shaped, interlocking metal plates to cover the entire body. A suit of plate includes gauntlets, heavy leather boots, a visored helmet, and thick layers of padding underneath the armor. Buckles and straps distribute the weight over the body.",
                        Name = "Plate Armor",
                        PriceInGold = 1500M,
                        WeightInPounds = 65M
                    }
                },
                Shield = new Equipment.Armor
                {
                    AC = 2,
                    ArmorType = Constants.ATShield,
                    Equipment = new Equipment.Equipment
                    {
                        Description = "A Shield is made from wood or metal and is carried in one hand. Wielding a Shield increases your Armor Class by 2. You can benefit from only one Shield at a time.",
                        Name = "Shield",
                        PriceInGold = 10M,
                        WeightInPounds = 6M
                    }
                },
            };

            ctx.Armors.AddRange
            (
                armors.Padded,
                armors.Leather,
                armors.StuddedLeather,
                armors.Hide,
                armors.ChainShirt,
                armors.ScaleMail,
                armors.Breastplate,
                armors.HalfPlate,
                armors.RingMail,
                armors.ChainMail,
                armors.Splint,
                armors.Plate,
                armors.Shield
            );

            return armors;
        }
    }
}
