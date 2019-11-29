import { Action } from "./action";

export class LegendaryActionSet {
	public id: number;
	public legendaryActionCount: number;
	public actions: Action[];
	public regionalEffects: string;
	public descriptionOverride: string;

	public static getDefault(): LegendaryActionSet {
		const model = new this();

		model.id = -1;
		model.actions = [];

		return model;
	}

	public static isEqual(
		a: LegendaryActionSet,
		b: LegendaryActionSet
	): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(a.id === b.id &&
				a.legendaryActionCount === b.legendaryActionCount &&
				Action.areEqual(a.actions, b.actions) &&
				a.regionalEffects === b.regionalEffects &&
				a.descriptionOverride === b.descriptionOverride)
		);
	}
}
