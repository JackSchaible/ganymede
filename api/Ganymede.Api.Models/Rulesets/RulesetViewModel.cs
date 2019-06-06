using System;

namespace Ganymede.Api.Models.Rulesets
{
    public class RulesetViewModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Abbrevation { get; set; }
        public DateTime ReleaseDate { get; set; }
        public PublisherViewModel Publisher { get; set; }
    }
}
