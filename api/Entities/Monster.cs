using System.Collections.Generic;

namespace api.Entities
{
  public class Monster
  {
	  public int MonsterId { get; set; }
    public bool IsPlayer { get; set; }
    public int InitiativeRoll { get; set; }

    public string Name { get; set; }
    public decimal Challenge { get; set; }
    public int XP { get; set; }
    public string Type { get; set; }
    public string Race { get; set; }
    public string Size { get; set; }

    public int Strength { get; set; }
    public int Dexterity { get; set; }
    public int Constitution { get; set; }
    public int Intelligence { get; set; }
    public int Wisdom { get; set; }
    public int Charisma { get; set; }
    public int Initiative { get; set; }
    public int Speed { get; set; }
    public int AC { get; set; }

    public List<Attack> Attacks { get; set; }
    public List<Feature> FeaturesAndSkills { get; set; }

    public int EncounterId { get; set; }
    public Encounter Encounter { get; set; }
  }
}
