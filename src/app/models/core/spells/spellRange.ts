export class SpellRange {
	public id: number;
	public amount: number;
	public unit: string;
	public self: boolean;
	public shape: string;
	public touch: boolean;

	public static getDefault(): SpellRange {
		const range = new SpellRange();
		range.id = -1;

		return range;
	}
}
