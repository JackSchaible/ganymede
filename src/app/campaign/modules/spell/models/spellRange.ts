export class SpellRange {
	public id: number;
	public amount: number;
	public unit: string;
	public shape: string;
	public type:
		| "Ranged"
		| "Self"
		| "Touch"
		| "Sight"
		| "Unlimited"
		| "Special";

	public static getDefault(): SpellRange {
		const range = new SpellRange();
		range.id = -1;

		return range;
	}

	public static isEqual(a: SpellRange, b: SpellRange): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(a.amount === b.amount &&
				a.id === b.id &&
				a.shape === b.shape &&
				a.type === b.type &&
				a.unit === b.unit)
		);
	}
}
