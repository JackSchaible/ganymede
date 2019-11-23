import { Spellcasting } from "./spellcasting";
import { InnateSpell } from "./innateSpell";

export class InnateSpellcasting extends Spellcasting {
	public spellsPerDay: { [index: number]: InnateSpell };

	public static getDefault(): InnateSpellcasting {
		const spell = new InnateSpellcasting();
		spell.id = -1;
		return spell;
	}

	public static isEqual(
		a: InnateSpellcasting,
		b: InnateSpellcasting
	): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		let areSpellsEqual = true;
		const aKeys = this.getKeys(a.spellsPerDay);
		const bKeys = this.getKeys(b.spellsPerDay);

		if (aKeys.length === bKeys.length)
			for (let i = 0; i < aKeys.length; i++) {
				if (aKeys[i] !== bKeys[i]) {
					areSpellsEqual = false;
					break;
				} else {
					if (
						!InnateSpell.isEqual(
							a.spellsPerDay[aKeys[i]],
							b.spellsPerDay[bKeys[i]]
						)
					) {
						areSpellsEqual = false;
						break;
					}
				}
			}
		else return false;

		return a === b || (Spellcasting.isEqual(a, b) && areSpellsEqual);
	}

	private static getKeys(spells: { [index: number]: InnateSpell }): number[] {
		var keys: number[] = [];

		for (let prop in spells)
			if (spells.hasOwnProperty(prop)) keys.push(parseInt(prop));

		return keys;
	}
}
