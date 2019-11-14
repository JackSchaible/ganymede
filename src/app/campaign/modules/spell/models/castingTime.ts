export class CastingTime {
	public id: number;
	public type: "Action" | "Reaction" | "Time" | "Bonus Action";
	public amount: number;
	public unit: string;
	public reactionCondition: string;

	public static getDefault(): CastingTime {
		const time = new CastingTime();
		time.id = -1;

		return time;
	}

	public static isEqual(a: CastingTime, b: CastingTime): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(a.id === b.id &&
				a.type === b.type &&
				a.amount === b.amount &&
				a.unit === b.unit &&
				a.reactionCondition === b.reactionCondition)
		);
	}
}
