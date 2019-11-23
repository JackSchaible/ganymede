export class SpecialTrait {
	public id: number;
	public name: string;
	public description: string;

	public static getDefault() {
		const trait = new SpecialTrait();

		trait.id = -1;

		return trait;
	}

	public static isEqual(a: SpecialTrait, b: SpecialTrait): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(a.id === b.id &&
				a.name === b.name &&
				a.description === b.description)
		);
	}

	public static areEqual(a: SpecialTrait[], b: SpecialTrait[]): boolean {
		let areTraitsSame: boolean = true;
		if (a && b) {
			if (a.length === b.length)
				for (let i = 0; i < a.length; i++) {
					if (i > b.length) {
						areTraitsSame = false;
						break;
					}

					if (!this.isEqual(a[i], b[i])) {
						areTraitsSame = false;
						break;
					}
				}
			else areTraitsSame = false;
		} else areTraitsSame = false;

		return areTraitsSame;
	}
}
