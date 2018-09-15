using System.Collections.Generic;

namespace api.Entities
{
  public class Encounter
  {
	  public int EncounterId { get; set; }
    public string Name { get; set; }
    public string Difficulty { get; set; }
    public int XP { get; set; }
    public string Location { get; set; }
    public string Notes { get; set; }

	  public List<Monster> Monsters { get; set; }

	  public int EncounterGroupId { get; set; }
	  public EncounterGroup EncounterGroup { get; set; }
  }
}
