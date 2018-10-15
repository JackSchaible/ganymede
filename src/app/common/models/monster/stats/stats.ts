import ArmorClass from "./armorClass";
import MovementType from "./movementType";
import Dice from "../../generic/dice";

export default class Stats {
	constructor(
		public Strength: number,
		public Dexterity: number,
		public Constitution: number,
		public Intelligence: number,
		public Wisdom: number,
		public Charisma: number,
		public Initiative: number,
		public Speed: number,
		public ExtraMovementTypes: MovementType[],
		public AC: ArmorClass,
		public HPAverage: number,
		public HPRoll: Dice,
		public ArmorType: string
	) {}

	static Default() {
		return new Stats(
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			[],
			ArmorClass.Default(),
			0,
			Dice.Default(),
			""
		);
	}
}
