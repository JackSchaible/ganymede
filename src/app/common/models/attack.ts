import Dice from "../../common/dice";

export default class Attack {
	public Name: string;
	public AttackBonus: number;
	public Dice: Dice;

	constructor(name: string, attackBonus: number, dice: Dice) {
		this.Name = name;
		this.AttackBonus = attackBonus;
		this.Dice = dice;
	}
}
