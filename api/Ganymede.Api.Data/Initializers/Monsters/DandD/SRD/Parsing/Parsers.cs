namespace Ganymede.Api.Data.Initializers.Monsters.DandD.SRD.Parsing
{
    internal class Parsers
    {
        public ActionSetParser ActionSet { get; set; }

        public Parsers()
        {
            ActionSet = new ActionSetParser();
        }
    }
}
