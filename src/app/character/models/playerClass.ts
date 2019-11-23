export class PlayerClass {
	public id: number;
	public name: string;

	public static getDefault(): PlayerClass {
		const player = new PlayerClass();

		player.id = -1;

		return player;
	}

	public static isEqual(a: PlayerClass, b: PlayerClass): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return a === b || (a.id === b.id && a.name === b.name);
	}
}
