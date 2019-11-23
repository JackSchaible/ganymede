import { ArmorClass } from "./armorClass";
import { DiceRoll } from "src/app/models/core/diceRoll";
import { Movement } from "./movement";

export class BasicStats {
	public id: number;
	public armorClass: ArmorClass;
	public hpDice: DiceRoll;
	public movement: Movement;

	public static getDefault(): BasicStats {
		const stats = new BasicStats();

		stats.id = -1;
		stats.armorClass = ArmorClass.getDefault();
		stats.hpDice = DiceRoll.getDefault();
		stats.movement = Movement.getDefault();

		return stats;
	}

	public static isEqual(a: BasicStats, b: BasicStats): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(a.id === b.id &&
				ArmorClass.isEqual(a.armorClass, b.armorClass) &&
				DiceRoll.isEqual(a.hpDice, b.hpDice) &&
				Movement.isEqual(a.movement, b.movement))
		);
	}
}
