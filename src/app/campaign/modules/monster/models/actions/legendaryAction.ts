import { Action } from "./action";

export class LegendaryAction extends Action {
	public actionCost: number;

	public static getDefault(): LegendaryAction {
		const effect = new this();

		effect.id = -1;

		return effect;
	}

	public static isEqual(a: LegendaryAction, b: LegendaryAction): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b || (Action.isEqual(a, b) && a.actionCost === b.actionCost)
		);
	}

	public static areEqual(
		a: LegendaryAction[],
		b: LegendaryAction[]
	): boolean {
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
