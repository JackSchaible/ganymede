using Ganymede.Api.Data.Initializers.InitializerData;
using System.IO;

namespace Ganymede.Api.Data.Initializers.Spells
{
    internal class SRDSpellsInitializer
    {
        public SpellData Initialize(ApplicationDbContext ctx, SpellData data, string rootPath)
        {
            foreach (var spellFile in Directory.EnumerateFiles(Path.Combine(rootPath, "Sources", "Spells")))
            {
                //TODO: Add spells
            }

            return data;
        }
    }
}
