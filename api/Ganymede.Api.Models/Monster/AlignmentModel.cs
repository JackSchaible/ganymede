namespace Ganymede.Api.Models.Monster
{
    public class AlignmentModel
    {
        public int AlignmentID { get; set; }
        public MonsterEnums.Morals Morals { get; set; }
        public MonsterEnums.Ethics Ethics { get; set; }
    }
}
