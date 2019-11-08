import { BasicStats } from "./basicStats";
import IFormEditable from "src/app/models/core/app/forms/iFormEditable";

export class Monster implements IFormEditable {
	public id: number;
	public name: string;
	public description: string;
	public basicStats: BasicStats;

	public static getDefault(): Monster {
		const monster = new Monster();

		monster.id = -1;
		monster.basicStats = BasicStats.getDefault();

		return monster;
	}

	public static isEqual(a: Monster, b: Monster): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(a.id === b.id &&
				a.name === b.name &&
				a.description === b.description &&
				BasicStats.isEqual(a.basicStats, b.basicStats))
		);
	}
}
