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
		if (!a && !b) return true;

		let areMaterialsSame: boolean = true;
		if (a.material && b.material) {
			for (let i = 0; i < a.material.length; i++) {
				if (i > b.material.length) {
					areMaterialsSame = false;
					break;
				}

				if (
					(a.material[i] || a.material[i] === "") &&
					(b.material[i] || b.material[i] === "") &&
					a.material[i] !== b.material[i]
				) {
					areMaterialsSame = false;
					break;
				}
			}
		} else areMaterialsSame = false;

		return (
			a === b ||
			(a.id === b.id &&
				a.verbal === b.verbal &&
				a.somatic === b.somatic &&
				areMaterialsSame)
		);
	}
}
