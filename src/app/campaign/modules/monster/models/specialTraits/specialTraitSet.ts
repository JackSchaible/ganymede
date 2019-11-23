import { SpecialTrait } from "./specialTrait";
import { Spellcasting } from "./spellcasting/spellcasting";

export class SpecialTraitSet {
	public id: number;
	public specialTraits: SpecialTrait[];
	public spellcastingModel: Spellcasting;

	public static getDefault(): SpecialTraitSet {
		const traits = new SpecialTraitSet();

		traits.id = -1;
		traits.specialTraits = [];
		traits.spellcastingModel = Spellcasting.getDefault();

		return traits;
	}

	public static isEqual(a: SpecialTraitSet, b: SpecialTraitSet): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(a.id === b.id &&
				SpecialTrait.areEqual(a.specialTraits, b.specialTraits) &&
				Spellcasting.isEqual(a.spellcastingModel, b.spellcastingModel))
		);
	}
}
