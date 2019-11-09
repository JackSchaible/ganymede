using Ganymede.Api.Data.Characters;
using Ganymede.Api.Data.Initializers.InitializerData;
using System.Linq;

namespace Ganymede.Api.Data.Initializers
{
    public class PlayerClassInitializer
    {
        public void Initialize(ApplicationDbContext ctx, out PlayerClassData pcData)
        {
            if (ctx.PlayerClasses.Any())
                pcData = LoadPlayerClasses(ctx);
            else
                pcData = CreatePlayerClasses(ctx);
        }

        private PlayerClassData LoadPlayerClasses(ApplicationDbContext ctx)
        {
            return new PlayerClassData
            {
                Barbarian = ctx.PlayerClasses.Single(pc => pc.Name == "Barbarian"),
                Bard = ctx.PlayerClasses.Single(pc => pc.Name == "Bard"),
                Cleric = ctx.PlayerClasses.Single(pc => pc.Name == "Cleric"),
                Druid = ctx.PlayerClasses.Single(pc => pc.Name == "Druid"),
                Fighter = ctx.PlayerClasses.Single(pc => pc.Name == "Fighter"),
                Monk = ctx.PlayerClasses.Single(pc => pc.Name == "Monk"),
                Paladin = ctx.PlayerClasses.Single(pc => pc.Name == "Paladin"),
                Ranger = ctx.PlayerClasses.Single(pc => pc.Name == "Ranger"),
                Rogue = ctx.PlayerClasses.Single(pc => pc.Name == "Rogue"),
                Sorcerer = ctx.PlayerClasses.Single(pc => pc.Name == "Sorcerer"),
                Warlock = ctx.PlayerClasses.Single(pc => pc.Name == "Warlock"),
                Wizard = ctx.PlayerClasses.Single(pc => pc.Name == "Wizard")
            };
        }
        private PlayerClassData CreatePlayerClasses(ApplicationDbContext ctx)
        {
            PlayerClass
                barb = new PlayerClass { Name = "Barbarian" },
                bard = new PlayerClass { Name = "Bard" },
                cleric = new PlayerClass { Name = "Cleric" },
                druid = new PlayerClass { Name = "Druid" },
                fighter = new PlayerClass { Name = "Fighter" },
                monk = new PlayerClass { Name = "Monk" },
                paladin = new PlayerClass { Name = "Paladin" },
                ranger = new PlayerClass { Name = "Ranger" },
                rogue = new PlayerClass { Name = "Rogue" },
                sorc = new PlayerClass { Name = "Sorcerer" },
                warlock = new PlayerClass { Name = "Warlock" },
                wiz = new PlayerClass { Name = "Wizard" };

            ctx.PlayerClasses.AddRange
            (
                barb, bard, cleric, druid, fighter, monk, paladin, ranger, rogue, sorc, warlock, wiz
            );

            return new PlayerClassData
            {
                Barbarian = barb,
                Bard = bard,
                Cleric = cleric,
                Druid = druid,
                Fighter = fighter,
                Monk = monk,
                Paladin = paladin,
                Ranger = ranger,
                Rogue = rogue,
                Sorcerer = sorc,
                Warlock = warlock,
                Wizard = wiz
            };
        }
    }
}
