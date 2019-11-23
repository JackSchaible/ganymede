import { Morals, Ethics } from "./monsterEnums";

export class Alignment {
	public id: number;
	public morals: Morals;
	public ethics: Ethics;

	public static isEqual(a: Alignment, b: Alignment): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(a.id === b.id &&
				a.id === b.id &&
				a.morals === b.morals &&
				a.ethics === b.ethics)
		);
	}

	public static areEqual(a: Alignment[], b: Alignment[]): boolean {
		let areAlignmentsSame: boolean = true;
		if (a && b) {
			if (a.length === b.length)
				for (let i = 0; i < a.length; i++) {
					if (i > b.length) {
						areAlignmentsSame = false;
						break;
					}

					if (!Alignment.isEqual(a[i], b[i])) {
						areAlignmentsSame = false;
						break;
					}
				}
			else areAlignmentsSame = false;
		} else areAlignmentsSame = false;

		return areAlignmentsSame;
	}
}
