export class CastingTime {
	public id: number;
	public amount: number;
	public unit: string;
	public reactionCondition: string;

	public static getDefault(): CastingTime {
		const time = new CastingTime();
		time.id = -1;

		return time;
	}
}
