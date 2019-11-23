import { Equipment } from "./equipment";
import { ArmorTypes } from "./equipmentEnums";

export class Armor extends Equipment {
	public armorType: ArmorTypes;
	public ac: number;
	public strengthRequired: number;
	public stealthDisadvantage: boolean;

	public static getDefault(): Armor {
		const armor = new Armor();

		armor.id = -1;

		return armor;
	}

	public static isEqual(a: Armor, b: Armor): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(Equipment.isEqual(a, b) &&
				a.armorType === b.armorType &&
				a.ac === b.ac &&
				a.strengthRequired === b.strengthRequired &&
				a.stealthDisadvantage === b.stealthDisadvantage)
		);
	}

	public static areEqual(a: Armor[], b: Armor[]): boolean {
		let areArmorsSame: boolean = true;
		if (a && b) {
			if (a.length === b.length)
				for (let i = 0; i < a.length; i++) {
					if (i > b.length) {
						areArmorsSame = false;
						break;
					}

					if (!Armor.isEqual(a[i], b[i])) {
						areArmorsSame = false;
						break;
					}
				}
			else areArmorsSame = false;
		} else areArmorsSame = false;

		return areArmorsSame;
	}
}
