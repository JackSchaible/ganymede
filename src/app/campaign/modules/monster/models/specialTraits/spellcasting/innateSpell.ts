import { Spell } from "src/app/campaign/modules/spell/models/spell";

export class InnateSpell {
	public spell: Spell;
	public specialConditions: string;

	public static getDefault(): InnateSpell {
		const spell = new InnateSpell();
		spell.spell = Spell.getDefault();
		return spell;
	}

	public static isEqual(a: InnateSpell, b: InnateSpell): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(Spell.isEqual(a.spell, b.spell) &&
				a.specialConditions === b.specialConditions)
		);
	}

	public static areEqual(a: InnateSpell[], b: InnateSpell[]): boolean {
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
