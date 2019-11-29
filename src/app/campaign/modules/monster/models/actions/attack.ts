import { Action } from "./action";
import { AttackTypes, TargetTypes } from "./actionEnums";
import { HitEffect } from "./hitEffect";

export class Attack extends Action {
	public type: AttackTypes;
	public rangeMin: number;
	public rangeMax: number;
	public target: TargetTypes;
	public extraGrappleRoll: boolean;
	public effects: HitEffect[];
	public miss: string;

	public static getDefault(): Attack {
		const attack = new this();

		attack.id = -1;
		attack.effects = [];

		return attack;
	}

	public static isEqual(a: Attack, b: Attack): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(a.id === b.id &&
				a.type === b.type &&
				a.rangeMin === b.rangeMin &&
				a.rangeMax === b.rangeMax &&
				a.target === b.target &&
				a.extraGrappleRoll === b.extraGrappleRoll &&
				HitEffect.areEqual(a.effects, b.effects) &&
				a.miss === b.miss)
		);
	}

	public static areEqual(a: HitEffect[], b: HitEffect[]): boolean {
		let areAttacksSame: boolean = true;
		if (a && b) {
			if (a.length === b.length)
				for (let i = 0; i < a.length; i++) {
					if (i > b.length) {
						areAttacksSame = false;
						break;
					}

					if (!this.isEqual(a[i], b[i])) {
						areAttacksSame = false;
						break;
					}
				}
			else areAttacksSame = false;
		} else areAttacksSame = false;

		return areAttacksSame;
	}
}
