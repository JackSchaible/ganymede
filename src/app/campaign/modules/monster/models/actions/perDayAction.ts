import { Action } from "./action";

export class PerDayAction extends Action {
	public numberPerDay: number;

	public static getDefault(): PerDayAction {
		const action = new this();

		action.id = -1;

		return action;
	}

	public static isEqual(a: PerDayAction, b: PerDayAction): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(Action.isEqual(a, b) && a.numberPerDay === b.numberPerDay)
		);
	}

	public static areEqual(a: PerDayAction[], b: PerDayAction[]): boolean {
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
