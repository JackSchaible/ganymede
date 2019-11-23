import { Armor } from "src/app/equipment/models/armor";

export class ArmorClass {
	public id: number;
	public armor: Armor[];
	public naturalArmorModifier: number;

	public static getDefault(): ArmorClass {
		const armor = new ArmorClass();

		armor.id = -1;

		return armor;
	}

	public static isEqual(a: ArmorClass, b: ArmorClass): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(a.id === b.id &&
				Armor.areEqual(a.armor, b.armor) &&
				a.naturalArmorModifier === b.naturalArmorModifier)
		);
	}
}
