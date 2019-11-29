export abstract class Equipment {
	public id: number;
	public name: string;
	public description: string;
	public priceInGold: number;
	public weightInPouds: number;

	public static isEqual(a: Equipment, b: Equipment): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(a.id === b.id &&
				a.name === b.name &&
				a.description === b.description &&
				a.priceInGold === b.priceInGold &&
				a.weightInPouds === b.weightInPouds)
		);
	}

	public static areEqual(a: Equipment[], b: Equipment[]): boolean {
		let areEquipmentSame: boolean = true;
		if (a && b) {
			if (a.length === b.length)
				for (let i = 0; i < a.length; i++) {
					if (i > b.length) {
						areEquipmentSame = false;
						break;
					}

					if (!this.isEqual(a[i], b[i])) {
						areEquipmentSame = false;
						break;
					}
				}
			else areEquipmentSame = false;
		} else areEquipmentSame = false;

		return areEquipmentSame;
	}
}
