import armorClass from "./armorClass";
import movementType from "./movementType";
import dice from "../../generic/dice";

export default class stats {
	constructor(
		public strength: number,
		public dexterity: number,
		public constitution: number,
		public intelligence: number,
		public wisdom: number,
		public charisma: number,
		public initiative: number,
		public speed: number,
		public extraMovementTypes: movementType[],
		public ac: armorClass,
		public hpAverage: number,
		public hpRoll: dice,
		public armorType: string
	) {}

	static default() {
		return new stats(
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			[],
			armorClass.default(),
			0,
			dice.default(),
			""
		);
	}
}
