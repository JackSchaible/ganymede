export class Movement {
	public id: number;
	public ground: number;
	public burrow: number;
	public climb: number;
	public fly: number;
	public canHover: boolean;
	public swim: number;

	public static getDefault(): Movement {
		const move = new Movement();

		move.id = -1;

		return move;
	}

	public static isEqual(a: Movement, b: Movement): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(a.id === b.id &&
				a.ground === b.ground &&
				a.burrow === b.burrow &&
				a.climb === b.climb &&
				a.fly === b.fly &&
				a.canHover === b.canHover &&
				a.swim === b.swim)
		);
	}
}
