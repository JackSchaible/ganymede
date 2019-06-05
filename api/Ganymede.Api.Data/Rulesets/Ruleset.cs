using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Rulesets
{
    public class Ruleset
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Abbrevation { get; set; }
        public DateTime ReleaseDate { get; set; }
        
        public int PublisherID { get; set; }
        [ForeignKey("PublisherID")]
        public Publisher Publisher { get; set; }
    }
}
