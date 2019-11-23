export class Language {
	public id: number;
	public name: string;

	public static getDefault(): Language {
		const language = new Language();

		language.id = -1;

		return language;
	}

	public static isEqual(a: Language, b: Language): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return a === b || (a.id === b.id && a.name === b.name);
	}
}
