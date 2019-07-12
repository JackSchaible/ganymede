export class SpellDuration {
	public id: number;
	public amount: number;
	public unit: string;
	public concentration: boolean;
	public special: boolean;
	public instantaneous: boolean;
	public upTo: boolean;

	public static getDefault(): SpellDuration {
		const duration = new SpellDuration();
		duration.id = -1;

		return duration;
	}
}
