import { RechargeConditions } from "./actionEnums";
import { Action } from "./action";

export class RechargeAction extends Action {
	public rechargesOn: RechargeConditions;
	public rechargeMin: number;
	public rechargeMax: number;

	public static getDefault(): RechargeAction {
		const action = new this();

		action.id = -1;

		return action;
	}

	public static isEqual(a: RechargeAction, b: RechargeAction): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(Action.isEqual(a, b) &&
				a.rechargeMin === b.rechargesOn &&
				a.rechargeMin === b.rechargeMin &&
				a.rechargeMax === b.rechargeMax)
		);
	}

	public static areEqual(a: RechargeAction[], b: RechargeAction[]): boolean {
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
