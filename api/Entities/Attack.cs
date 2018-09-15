namespace api.Entities
{
  public class Attack
  {
	  public int AttackId { get; set; }
    public string Name { get; set; }
    public int AttackBonus { get; set; }

    public int DiceId { get; set; }
    public Dice Dice { get; set; }

    public int MonsterId { get; set; }
    public Monster Monster { get; set; }
  }
}
