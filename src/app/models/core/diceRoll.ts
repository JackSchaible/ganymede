import { DiceTypes } from "./commonEnums";

export class DiceRoll {
	public id: number;
	public number: number;
	public sides: DiceTypes;

	public static getDefault(): DiceRoll {
		const roll = new DiceRoll();

		roll.id = -1;

		return roll;
	}

	public static isEqual(a: DiceRoll, b: DiceRoll): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(a.id === b.id &&
				a.id === b.id &&
				a.sides === b.sides &&
				a.number === b.number)
		);
	}
}
