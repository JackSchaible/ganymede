export class SpellDuration {
	public id: number;
	public amount: number;
	public unit: string;
	public concentration: boolean;
	public special: boolean;
	public instantaneous: boolean;
	public upTo: boolean;
	public untilDispelled: boolean;
	public untilTriggered: boolean;

	public static getDefault(): SpellDuration {
		const duration = new SpellDuration();
		duration.id = -1;

		return duration;
	}

	public static isEqual(a: SpellDuration, b: SpellDuration): boolean {
		if ((!a && b) || (a && !b)) return false;

		return (
			a === b ||
			(a.amount === b.amount &&
				a.concentration === b.concentration &&
				a.id === b.id &&
				a.instantaneous === b.instantaneous &&
				a.special === b.special &&
				a.unit === b.unit &&
				a.upTo === b.upTo)
		);
	}
}
