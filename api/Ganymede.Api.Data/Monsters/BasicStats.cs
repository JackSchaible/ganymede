using System.ComponentModel.DataAnnotations.Schema;

namespace Ganymede.Api.Data.Monsters
{
    public class BasicStats
    {
        public int ID { get; set; }
        public float CR { get; set; }
        public int XP { get; set; }
        public int Strength { get; set; }
        public int Dexterity { get; set; }
        public int Constitution { get; set; }
        public int Intelligence { get; set; }
        public int Wisdom { get; set; }
        public int Charisma { get; set; }

        public int MonsterID { get; set; }
        [ForeignKey("MonsterID")]
        public Monster Monster { get; set; }
    }
}
