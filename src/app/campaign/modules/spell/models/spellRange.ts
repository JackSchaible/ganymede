export class SpellRange {
	public id: number;
	public amount: number;
	public unit: string;
	public self: boolean;
	public shape: string;
	public touch: boolean;
	public sight: boolean;
	public unlimited: boolean;
	public special: boolean;

	public static getDefault(): SpellRange {
		const range = new SpellRange();
		range.id = -1;

		return range;
	}

	public static isEqual(a: SpellRange, b: SpellRange): boolean {
		return (
			a === b ||
			(a.amount === b.amount &&
				a.id === b.id &&
				a.self === b.self &&
				a.shape === b.shape &&
				a.touch === b.touch &&
				a.unit === b.unit)
		);
	}
}
