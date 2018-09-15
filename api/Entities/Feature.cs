namespace api.Entities
{
  public class Feature
  {
	  public int FeatureId { get; set; }
	  public string Name { get; set; }
	  public string Description { get; set; }

	  public int MonsterId { get; set; }
	  public Monster Monster { get; set; }
  }
}
