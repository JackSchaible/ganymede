export class BasicStats {
	public id: number;
	public cr: number;
	public xp: number;
	public strength: number;
	public dexterity: number;
	public constitution: number;
	public intelligence: number;
	public wisdom: number;
	public charisma: number;

	public static getDefault(): BasicStats {
		const stats = new BasicStats();
		stats.id = -1;
		return stats;
	}

	public static isEqual(a: BasicStats, b: BasicStats): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(a.id === b.id &&
				a.cr === b.cr &&
				a.xp === b.xp &&
				a.strength === b.strength &&
				a.dexterity === b.dexterity &&
				a.constitution === b.constitution &&
				a.intelligence === b.intelligence &&
				a.wisdom === b.wisdom &&
				a.charisma === b.charisma)
		);
	}
}
