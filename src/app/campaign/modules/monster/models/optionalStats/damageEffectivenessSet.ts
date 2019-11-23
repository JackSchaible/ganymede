import { DamageTypes } from "../actions/actionEnums";
import { Conditions, ObjectSubstances } from "src/app/models/core/commonEnums";

export class DamageEffectivenessSet {
	public id: number;
	public vulnerabilities: DamageTypes[];
	public resistances: DamageTypes[];
	public immunities: DamageTypes[];
	public conditionImmunities: Conditions[];
	public reistantToNonMagicAttacks: boolean;
	public resistanceWeaknesses: ObjectSubstances[];
	public immuneToNonMagicAttacks: boolean;
	public immunityWeaknesses: ObjectSubstances[];

	public static getDefault() {
		const set = new DamageEffectivenessSet();

		set.id = -1;
		set.vulnerabilities = [];
		set.resistances = [];
		set.immunities = [];
		set.conditionImmunities = [];
		set.resistanceWeaknesses = [];
		set.immunityWeaknesses = [];

		return set;
	}

	public static isEqual(
		a: DamageEffectivenessSet,
		b: DamageEffectivenessSet
	): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(a.id === b.id &&
				this.isArrayEqual(a.vulnerabilities, b.vulnerabilities) &&
				this.isArrayEqual(a.resistances, b.resistances) &&
				this.isArrayEqual(a.immunities, b.immunities) &&
				this.isArrayEqual(
					a.conditionImmunities,
					b.conditionImmunities
				) &&
				a.reistantToNonMagicAttacks === b.reistantToNonMagicAttacks &&
				this.isArrayEqual(
					a.resistanceWeaknesses,
					b.resistanceWeaknesses
				) &&
				a.immuneToNonMagicAttacks === b.immuneToNonMagicAttacks &&
				this.isArrayEqual(a.immunityWeaknesses, b.immunityWeaknesses))
		);
	}

	private static isArrayEqual(a: number[], b: number[]): boolean {
		let isSame: boolean = true;
		if (a && b) {
			if (a.length === b.length)
				for (let i = 0; i < a.length; i++) {
					if (i > b.length) {
						isSame = false;
						break;
					}

					if (a[i] !== b[i]) {
						isSame = false;
						break;
					}
				}
			else isSame = false;
		} else isSame = false;

		return isSame;
	}
}
