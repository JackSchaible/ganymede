import { Action } from "./action";

export class ActionSet {
	public id: number;
	public actions: Action[];
	public multiAttack: string;

	public static getDefault(): ActionSet {
		const actionSet = new this();

		actionSet.id = -1;
		actionSet.actions = [];

		return actionSet;
	}

	public static isEqual(a: ActionSet, b: ActionSet): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(a.id === b.id &&
				a.id === b.id &&
				Action.areEqual(a.actions, b.actions) &&
				a.multiAttack === b.multiAttack)
		);
	}
}
