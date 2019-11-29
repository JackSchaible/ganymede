import { DiceRoll } from "src/app/models/core/diceRoll";
import { DamageTypes } from "./actionEnums";

export class HitEffect {
	public id: number;
	public damage: DiceRoll;
	public damageType: DamageTypes;
	public extraEffect: string;
	public condition: string;

	public static getDefault(): HitEffect {
		const effect = new this();

		effect.id = -1;
		effect.damage = DiceRoll.getDefault();

		return effect;
	}

	public static isEqual(a: HitEffect, b: HitEffect): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(a.id === b.id &&
				DiceRoll.isEqual(a.damage, b.damage) &&
				a.damageType === b.damageType &&
				a.extraEffect === b.extraEffect &&
				a.condition === b.condition)
		);
	}

	public static areEqual(a: HitEffect[], b: HitEffect[]): boolean {
		let areEffectsSame: boolean = true;
		if (a && b) {
			if (a.length === b.length)
				for (let i = 0; i < a.length; i++) {
					if (i > b.length) {
						areEffectsSame = false;
						break;
					}

					if (!this.isEqual(a[i], b[i])) {
						areEffectsSame = false;
						break;
					}
				}
			else areEffectsSame = false;
		} else areEffectsSame = false;

		return areEffectsSame;
	}
}
