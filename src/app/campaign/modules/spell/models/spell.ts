import { CastingTime } from "./castingTime";
import { SpellComponents } from "./spellComponents";
import { SpellDuration } from "./spellDuration";
import { SpellSchool } from "./spellSchool";
import { SpellRange } from "./spellRange";
import IFormEditable from "src/app/models/core/app/forms/iFormEditable";

export class Spell implements IFormEditable {
	public id: number;
	public name: string;
	public level: number;
	public ritual: boolean;
	public description: string;
	public atHigherLevels: string;
	public spellSchool: SpellSchool;
	public castingTime: CastingTime;
	public spellRange: SpellRange;
	public spellComponents: SpellComponents;
	public spellDuration: SpellDuration;

	public static getDefault() {
		const spell = new Spell();

		spell.id = -1;
		spell.castingTime = CastingTime.getDefault();
		spell.spellRange = SpellRange.getDefault();
		spell.spellComponents = SpellComponents.getDefault();
		spell.spellDuration = SpellDuration.getDefault();

		return spell;
	}

	public static isEqual(a: Spell, b: Spell): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(a.atHigherLevels === b.atHigherLevels &&
				CastingTime.isEqual(a.castingTime, b.castingTime) &&
				a.description === b.description &&
				a.id === b.id &&
				a.level === b.level &&
				a.name === b.name &&
				a.ritual === b.ritual &&
				SpellComponents.isEqual(a.spellComponents, b.spellComponents) &&
				SpellDuration.isEqual(a.spellDuration, b.spellDuration) &&
				SpellRange.isEqual(a.spellRange, b.spellRange) &&
				SpellSchool.isEqual(a.spellSchool, b.spellSchool))
		);
	}

	public static areEqual(a: Spell[], b: Spell[]): boolean {
		let areSpellsSame: boolean = true;
		if (a && b) {
			if (a.length === b.length)
				for (let i = 0; i < a.length; i++) {
					if (i > b.length) {
						areSpellsSame = false;
						break;
					}

					if (!this.isEqual(a[i], b[i])) {
						areSpellsSame = false;
						break;
					}
				}
			else areSpellsSame = false;
		} else areSpellsSame = false;

		return areSpellsSame;
	}
}
