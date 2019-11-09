using Ganymede.Api.Data.Initializers.InitializerData;
using System.Linq;

namespace Ganymede.Api.Data.Initializers
{
    internal class SpellsInitializer
    {
        public void Initialize(ApplicationDbContext ctx, Campaign pota, out SpellData spells)
        {
            if (ctx.Spells.Any())
                spells = LoadData(ctx);
            else
                spells = CreateDandDSpells(ctx, pota);
        }

        private SpellData LoadData(ApplicationDbContext ctx)
        {
            return new SpellData
            {
                ChainLightning = ctx.Spells.Single(s => s.Name == "Chain Lightning"),
                Seeming = ctx.Spells.Single(s => s.Name == "Seeming"),
                Cloudkill = ctx.Spells.Single(s => s.Name == "Cloudkill"),
                StormSphere = ctx.Spells.Single(s => s.Name == "Storm Sphere"),
                IceStorm = ctx.Spells.Single(s => s.Name == "Ice Storm"),
                LightningBolt = ctx.Spells.Single(s => s.Name == "Lightning Bolt"),
                GaseousForm = ctx.Spells.Single(s => s.Name == "Gaseous Form"),
                Fly = ctx.Spells.Single(s => s.Name == "Fly"),
                Invisibility = ctx.Spells.Single(s => s.Name == "Invisibility"),
                GustOfWind = ctx.Spells.Single(s => s.Name == "Gust of Wind"),
                DustDevil = ctx.Spells.Single(s => s.Name == "Dust Devil"),
                Thunderwave = ctx.Spells.Single(s => s.Name == "Thunderwave"),
                MageArmor = ctx.Spells.Single(s => s.Name == "Mage Armor"),
                FeatherFall = ctx.Spells.Single(s => s.Name == "Feather Fall"),
                CharmPerson = ctx.Spells.Single(s => s.Name == "Charm Person"),
                ShockingGrasp = ctx.Spells.Single(s => s.Name == "Shocking Grasp"),
                RayOfFrost = ctx.Spells.Single(s => s.Name == "Ray of Frost"),
                Prestidigitation = ctx.Spells.Single(s => s.Name == "Prestidigitation"),
                Message = ctx.Spells.Single(s => s.Name == "Message"),
                MageHand = ctx.Spells.Single(s => s.Name == "Mage Hand"),
                Gust = ctx.Spells.Single(s => s.Name == "Gust")
            };
        }

        private SpellData CreateDandDSpells(ApplicationDbContext ctx, Campaign campaign)
        {
            return new SpellsDnDInitializer().Initialize(ctx, campaign);
        }
    }
}
