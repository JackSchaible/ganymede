import { Abilities } from "src/app/models/core/commonEnums";
import { SpellcastingTypes } from "./spellcastingEnums";

export class Spellcasting {
	public id: number;
	public psionic: boolean;
	public spellcastingAbility: Abilities;
	public spellcastingType: SpellcastingTypes;

	public static getDefault(): Spellcasting {
		const model = new Spellcasting();

		model.id = -1;

		return model;
	}

	public static isEqual(a: Spellcasting, b: Spellcasting): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(a.id === b.id &&
				a.psionic === b.psionic &&
				a.spellcastingAbility === b.spellcastingAbility &&
				a.spellcastingType === b.spellcastingType)
		);
	}
}
