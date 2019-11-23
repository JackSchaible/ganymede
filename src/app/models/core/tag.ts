export class Tag {
	public id: number;
	public name: string;

	public static getDefault(): Tag {
		const tag = new Tag();

		tag.id = -1;

		return tag;
	}

	public static isEqual(a: Tag, b: Tag): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return a === b || (a.id === b.id && a.name === b.name);
	}

	public static areEqual(a: Tag[], b: Tag[]): boolean {
		let areTagsSame: boolean = true;
		if (a && b) {
			if (a.length === b.length)
				for (let i = 0; i < a.length; i++) {
					if (i > b.length) {
						areTagsSame = false;
						break;
					}

					if (!Tag.isEqual(a[i], b[i])) {
						areTagsSame = false;
						break;
					}
				}
			else areTagsSame = false;
		} else areTagsSame = false;

		return areTagsSame;
	}
}
