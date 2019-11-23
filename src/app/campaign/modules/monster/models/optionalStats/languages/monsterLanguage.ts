import { Language } from "src/app/models/core/language";

export class MonsterLanguage {
	public language: Language;
	public understand: boolean;
	public speak: boolean;
	public read: boolean;
	public write: boolean;

	public static getDefault(): MonsterLanguage {
		const ml = new MonsterLanguage();

		ml.language = Language.getDefault();

		return ml;
	}

	public static isEqual(a: MonsterLanguage, b: MonsterLanguage): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(Language.isEqual(a.language, b.language) &&
				a.understand === b.understand &&
				a.speak === b.speak &&
				a.read === b.read &&
				a.write === b.write)
		);
	}

	public static areEqual(
		a: MonsterLanguage[],
		b: MonsterLanguage[]
	): boolean {
		let areLanguagesSame: boolean = true;
		if (a && b) {
			if (a.length === b.length)
				for (let i = 0; i < a.length; i++) {
					if (i > b.length) {
						areLanguagesSame = false;
						break;
					}

					if (!this.isEqual(a[i], b[i])) {
						areLanguagesSame = false;
						break;
					}
				}
			else areLanguagesSame = false;
		} else areLanguagesSame = false;

		return areLanguagesSame;
	}
}
