export class Action {
	public id: number;
	public name: string;
	public description: string;
	public reaction: boolean;
	public lair: boolean;

	public static getDefault(): Action {
		const action = new this();

		action.id = -1;

		return action;
	}

	public static isEqual(a: Action, b: Action): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(a.id === b.id &&
				a.name === b.name &&
				a.description === b.description &&
				a.reaction === b.reaction &&
				a.lair === b.lair)
		);
	}

	public static areEqual(a: Action[], b: Action[]): boolean {
		let areActionsSame: boolean = true;
		if (a && b) {
			if (a.length === b.length)
				for (let i = 0; i < a.length; i++) {
					if (i > b.length) {
						areActionsSame = false;
						break;
					}

					if (!this.isEqual(a[i], b[i])) {
						areActionsSame = false;
						break;
					}
				}
			else areActionsSame = false;
		} else areActionsSame = false;

		return areActionsSame;
	}
}
