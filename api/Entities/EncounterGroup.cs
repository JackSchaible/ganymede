using System;
using System.Collections.Generic;

namespace api.Entities
{
  public class EncounterGroup
  {
    public int EncounterGroupId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    public List<Encounter> Encounters { get; set; }
    public List<EncounterGroup> ChildrenEncounterGroups { get; set; }

	  public int? ParentEncounterGroupId { get; set; }
    public EncounterGroup ParentEncounterGroup { get; set; }

	  public string AppUserId { get; set; }
    public AppUser AppUser { get; set; }
  }
}
