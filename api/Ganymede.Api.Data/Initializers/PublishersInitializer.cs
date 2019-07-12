using Ganymede.Api.Data.Rulesets;
using System.Collections.Generic;
using System.Linq;

namespace Ganymede.Api.Data.Initializers
{
    internal class PublishersInitializer
    {
        public void Initialize(ApplicationDbContext ctx, out Publisher wizards, out Publisher paizo)
        {
            if (ctx.Publishers.Any())
            {
                wizards = ctx.Publishers.Single(p => p.Name == "Wizards of the Coast LLC.");
                paizo = ctx.Publishers.Single(p => p.Name == "Paizo Inc.");
            }
            else
            {
                List<Publisher> publishers = CreatePublishers();
                wizards = publishers[0];
                paizo = publishers[1];
                ctx.Publishers.AddRange(publishers);
            }
        }

        private List<Publisher> CreatePublishers()
        {
            return new List<Publisher>
            {
                new Publisher
                {
                    Name = "Wizards of the Coast LLC."
                },
                new Publisher
                {
                    Name = "Paizo Inc."
                }
            };
        }
    }
}
