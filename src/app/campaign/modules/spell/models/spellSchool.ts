export class SpellSchool {
	public id: number;
	public name: string;
	public description: string;

	public static getDefault(): SpellSchool {
		return {
			id: -1,
			name: undefined,
			description: undefined
		};
	}

	public static isEqual(a: SpellSchool, b: SpellSchool): boolean {
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
