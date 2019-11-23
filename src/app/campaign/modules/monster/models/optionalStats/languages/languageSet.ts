import { MonsterLanguage } from "./monsterLanguage";

export class LanguageSet {
	public id: number;
	public languages: MonsterLanguage[];
	public telepathyRange: number;
	public anyFreeLanguages: number;
	public special: string;

	public static getDefault(): LanguageSet {
		const set = new LanguageSet();

		set.id = -1;
		set.languages = [];

		return set;
	}

	public static isEqual(a: LanguageSet, b: LanguageSet): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(a.id === b.id &&
				MonsterLanguage.areEqual(a.languages, b.languages) &&
				a.telepathyRange === b.telepathyRange &&
				a.anyFreeLanguages === b.anyFreeLanguages &&
				a.special === b.special)
		);
	}
}
