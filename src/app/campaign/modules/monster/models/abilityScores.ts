export class AbilityScores {
	public id: number;
	public strength: number;
	public dexterity: number;
	public constitution: number;
	public intelligence: number;
	public wisdom: number;
	public charisma: number;

	public static getDefault(): AbilityScores {
		const scores = new AbilityScores();

		scores.id = -1;

		return scores;
	}

	public static isEqual(a: AbilityScores, b: AbilityScores): boolean {
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
