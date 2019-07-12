using Ganymede.Api.Data.Monsters;
using System.Collections.Generic;
using System.Linq;

namespace Ganymede.Api.Data.Initializers
{
    internal class MonstersInitializer
    {
        public void Initialize(ApplicationDbContext ctx, out IEnumerable<Monster> dAndDMonsters, out IEnumerable<Monster> pfMonsters, out Monster aerisi)
        {
            if (ctx.Monsters.Any())
            {
                aerisi = ctx.Monsters.Single(m => m.Name == "Aerisi Kalinoth");
                dAndDMonsters = ctx.Monsters.Where(m => m.Campaign.Ruleset.Abbrevation == "5e");
                pfMonsters = ctx.Monsters.Where(m => m.Campaign.Ruleset.Abbrevation == "Pf");
            }
            else
            {
                dAndDMonsters = CreateDandDMonsters();
                pfMonsters = CreatePathfinderMonsters();

                ctx.Monsters.AddRange(dAndDMonsters);
                ctx.Monsters.AddRange(pfMonsters);

                aerisi = dAndDMonsters.Single(m => m.Name == "Aerisi Kalinoth");
            }
        }

        private List<Monster> CreateDandDMonsters()
        {
            return new List<Monster>
            {
                new Monster
                {
                    Name = "Aerisi Kalinoth",
                    Description =
                        "<p>The moon elf Aerisi Kalinoth leads the Cult of the Howling Hatred. Tall and slender, with illusory wings that gently fan the air, Aerisi speaks to her people in a whisper that sounds clearly in the ears of all in her presence. Aerisi regards her followers not as cultists, but as her noble subjects. Before them she is prophet and queen. Musicians and courtiers amuse and flatter her, and warriors mounted on hippogriffs serve as her knights.</p>" +
                        "<p>Aerisi grew up in an enchanted castle in a remote part of Faerie, surrounded by tales, histories, and tomes of magic. She passed her early years playing games, practicing enchantments, and imagining herself as one of the avariel (winged elves) from her storybooks. Her parents sheltered her from the conflicts of Faerun, and she came of age with a tender and fragile disposition.</p>" +
                        "<p>Eventually her parents decided it was time for their daughter to engage in elven society, and they brought her to the hidden city of Evereska. Her parents then realized their grave mistake. In pampering and sheltering their daughter, they had raised not a young lady but a spoiled child. Accustomed to having all she desired, the princess erupted into tantrums whenever she was denied her slightest whim, and the moon elves of Evereska could hardly endure her.</p>" +
                        "<p>Aerisi felt powerless among the moon elves. Although she had become a skilled enchanter in Faerie, her people were resistant to such charms. In her dreams she began to envision herself as one of the winged elves from her storybooks. She wished to control the wind and go wherever she liked, and to punish those who offended her. The childlike fantasies of her youth became dark visions where she ruled the storms and the air itself. She dreamed of an old mystic with brown skin and white hair, who promised to teach her all she desired to know—a vision of Yan-C-Bin, the Prince of Evil Air. Aerisi turned her study to elemental air, learning the secret of flight and escaping Evereska to follow the deluded visions of her dreams.</p>" +
                        "<p>Aerisi's visions led her to a strange altar in a cavern beneath the Sumber Hills, where she acquired the spear Windvane. Driven by Yan-C-Bin, she dubbed herself a queen and set out to find followers to rule. Her enchantments helped fill the ranks of the Cult of the Howling Hatred with initiates hopelessly devoted to her.</p>" +
                        "<p><em>Traits.</em> No one can deny Aerisi's grace, but she also possesses a violent temper that reveals itself whenever she is denied what she wants. Aerisi is prone to flights of fancy and impulsive decadence. She doesn't see herself as evil because she lacks the capacity to empathize with anyone else.Those who worship and please her are good, and those who defy her are wicked and must be punished.Her wish to lash the world with storms and destruction is, at its root, a temper tantrum against the elven society that dared to impose its strictures on her.</p>",
                    BasicStats = new BasicStats
                    {
                        CR = 7,
                        XP = 2900,
                        Strength = 8,
                        Dexterity = 16,
                        Constitution = 12,
                        Intelligence = 17,
                        Wisdom = 10,
                        Charisma = 16
                    }
                },
                new Monster
                {
                    Name = "Thurl Merosska",
                    Description =
                        "<p>Thurl Merosska is the leader of the Feathergale Knights. Once a griffin rider of Waterdeep, Thurl retired after a storm nearly claimed his life. Obsessed with his near-death experience, Thurl learned of Yan-C-Bin and swore an oath to serve the elemental prince in exchange for power.</p>" +
                        "<p>Thurl realized that there were others among the wealthy of Waterdeep who might make worthy servants to Yan-C-Bin. He formed the Feathergale Society to lure likely individuals into the air cult. He indoctrinated his Feahtergale knights, one by one, into the cult's beliefs.</p>" +
                        "<p>When Aerisi Kalinoth arose as the chosen prophet of air, Thurl reluctantly pledged the Feathergale Knights to the cause. He resents Aerisi Kalinoth's rulership of the cult, but tells himself that he can use her and her followers to make the Feathergale Society strong enough to rule Waterdeep as it should be ruled.</p>",
                    BasicStats = new BasicStats
                    {
                        CR = 3,
                        XP = 700,
                        Strength = 16,
                        Dexterity = 14,
                        Constitution = 14,
                        Intelligence = 10,
                        Wisdom = 10,
                        Charisma = 15
                    }
                },
                new Monster
                {
                    Name = "Giant Vulture",
                    Description = "<p>A giant vulture has advanced intelligence and a malevolent bent. Unlike its smaller kin, it will attack a wounded creature to hasten its end. Giant vultures have been known to haunt a thirsty, starving creature for days to enjoy its suffering.</p>",
                    BasicStats = new BasicStats
                    {
                        CR = 1,
                        XP = 200,
                        Strength = 15,
                        Dexterity = 10,
                        Constitution = 15,
                        Intelligence = 6,
                        Wisdom = 12,
                        Charisma = 7
                    }
                },
                new Monster
                {
                    Name = "Feathergale Knight",
                    BasicStats = new BasicStats
                    {
                        CR = 1,
                        XP = 200,
                        Strength = 14,
                        Dexterity = 14,
                        Constitution = 12,
                        Intelligence = 11,
                        Wisdom = 10,
                        Charisma = 14
                    }
                }
            };
        }

        private List<Monster> CreatePathfinderMonsters()
        {
            return new List<Monster>
            {
                new Monster
                {
                    Name = "Goblin",
                    BasicStats = new BasicStats
                    {
                        CR = 0.333f,
                        XP = 135,
                        Strength = 11,
                        Dexterity = 15,
                        Constitution = 12,
                        Intelligence = 10,
                        Wisdom = 9,
                        Charisma = 6
                    }
                },
                new Monster
                {
                    Name = "Goblin Commando",
                    BasicStats = new BasicStats
                    {
                        CR = 0.5f,
                        XP = 200,
                        Strength = 12,
                        Dexterity = 17,
                        Constitution = 15,
                        Intelligence = 8,
                        Wisdom = 12,
                        Charisma = 8
                    }
                },
                new Monster
                {
                    Name = "Goblin Dog",
                    BasicStats = new BasicStats
                    {
                        CR = 1f,
                        XP = 400,
                        Strength = 15,
                        Dexterity = 14,
                        Constitution = 15,
                        Intelligence = 2,
                        Wisdom = 12,
                        Charisma = 8
                    }
                }
            };
        }
    }
}
