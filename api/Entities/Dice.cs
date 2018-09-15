namespace api.Entities
{
  public class Dice
  {
	  public int DiceId { get; set; }
	  public int Count { get; set; }
	  public int Sides { get; set; }

	  public int AttackId { get; set; }
	  public Attack AttackRoll { get; set; }
  }
}
