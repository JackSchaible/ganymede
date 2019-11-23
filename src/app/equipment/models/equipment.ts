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
}
