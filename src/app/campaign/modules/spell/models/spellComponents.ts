export class SpellComponents {
	public id: number;
	public verbal: boolean;
	public somatic: boolean;
	public material: string[];

	public static getDefault(): SpellComponents {
		const c = new SpellComponents();
		c.id = -1;

		return c;
	}

	public static isEqual(a: SpellComponents, b: SpellComponents): boolean {
		if ((!a && b) || (a && !b)) return false;

		return (
			a === b ||
			(a.id === b.id &&
				a.verbal === b.verbal &&
				a.somatic === b.somatic &&
				a.material === b.material)
		);
	}
}
