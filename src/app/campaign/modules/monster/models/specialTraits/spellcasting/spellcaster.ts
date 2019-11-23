import { Spellcasting } from "./spellcasting";
import { PlayerClass } from "src/app/character/models/playerClass";
import { Spell } from "src/app/campaign/modules/spell/models/spell";

export class Spellcaster extends Spellcasting {
	public spellcasterLevel: number;
	public spellcastingClass: PlayerClass;
	public spellsPerDay: number[];
	public spells: Spell[];

	public static getDefault(): Spellcaster {
		const spellcaster = new Spellcaster();

		spellcaster.id = -1;
		spellcaster.spellcastingClass = PlayerClass.getDefault();
		spellcaster.spellsPerDay = [];
		spellcaster.spells = [];

		return spellcaster;
	}

	public static isEqual(a: Spellcaster, b: Spellcaster): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		let areSpellSlotsSame: boolean = true;
		if (a && b) {
			if (a.spellsPerDay.length === b.spellsPerDay.length)
				for (let i = 0; i < a.spellsPerDay.length; i++) {
					if (i > b.spellsPerDay.length) {
						areSpellSlotsSame = false;
						break;
					}

					if (!this.isEqual(a[i], b[i])) {
						areSpellSlotsSame = false;
						break;
					}
				}
			else areSpellSlotsSame = false;
		} else areSpellSlotsSame = false;

		return (
			a === b ||
			(a.id === b.id &&
				a.spellcasterLevel === b.spellcasterLevel &&
				PlayerClass.isEqual(a.spellcastingClass, b.spellcastingClass) &&
				Spell.areEqual(a.spells, b.spells) &&
				areSpellSlotsSame)
		);
	}
}
