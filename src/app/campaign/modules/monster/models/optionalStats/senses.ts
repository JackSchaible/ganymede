export class Senses {
	public id: number;
	public blindsight: number;
	public darkvision: number;
	public tremorsense: number;
	public truesight: number;
	public passivePerceptionOverride: number;

	public static getDefault(): Senses {
		const senses = new Senses();

		senses.id = -1;

		return senses;
	}

	public static isEqual(a: Senses, b: Senses): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(a.id === b.id &&
				a.blindsight === b.blindsight &&
				a.darkvision === b.darkvision &&
				a.tremorsense === b.tremorsense &&
				a.truesight === b.truesight &&
				a.passivePerceptionOverride === b.passivePerceptionOverride)
		);
	}
}
