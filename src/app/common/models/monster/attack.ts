import Dice from "../generic/dice";

export default class Attack {
	constructor(
		public Name: string,
		public AttackBonus: number,
		public Dice: Dice
	) {}
}
