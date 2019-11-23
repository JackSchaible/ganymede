export class SavingThrowSet {
	public id: number;
	public strength: boolean;
	public dexterity: boolean;
	public constitution: boolean;
	public intelligence: boolean;
	public wisdom: boolean;
	public charisma: boolean;

	public static getDefault(): SavingThrowSet {
		const set = new SavingThrowSet();

		set.id = -1;

		return set;
	}

	public static isEqual(a: SavingThrowSet, b: SavingThrowSet): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(a.id === b.id &&
				a.strength === b.strength &&
				a.dexterity === b.dexterity &&
				a.constitution === b.constitution &&
				a.intelligence === b.intelligence &&
				a.wisdom === b.wisdom &&
				a.charisma === b.charisma)
		);
	}
}
