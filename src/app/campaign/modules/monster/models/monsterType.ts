export class MonsterType {
	public id: number;
	public name: string;
	public description: string;

	public static getDefault(): MonsterType {
		const type = new MonsterType();

		type.id = -1;

		return type;
	}

	public static isEqual(a: MonsterType, b: MonsterType): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(a.id === b.id &&
				a.name === b.name &&
				a.description === b.description)
		);
	}
}
