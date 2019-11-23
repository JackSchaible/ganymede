import { SavingThrowSet } from "./savingThrowSet";
import { DamageEffectivenessSet } from "./damageEffectivenessSet";
import { Senses } from "./senses";
import { LanguageSet } from "./languages/languageSet";

export class OptionalStatsSet {
	public id: number;
	public savingThrows: SavingThrowSet;
	public effectivenesses: DamageEffectivenessSet;
	public senses: Senses;
	public languages: LanguageSet;
	public crAdjustment: number;

	public static getDefault(): OptionalStatsSet {
		const stats = new OptionalStatsSet();

		stats.id = -1;
		stats.savingThrows = SavingThrowSet.getDefault();
		stats.effectivenesses = DamageEffectivenessSet.getDefault();
		stats.senses = Senses.getDefault();
		stats.languages = LanguageSet.getDefault();

		return stats;
	}

	public static isEqual(a: OptionalStatsSet, b: OptionalStatsSet): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(a.id === b.id &&
				SavingThrowSet.isEqual(a.savingThrows, b.savingThrows) &&
				DamageEffectivenessSet.isEqual(
					a.effectivenesses,
					b.effectivenesses
				) &&
				Senses.isEqual(a.senses, b.senses) &&
				LanguageSet.isEqual(a.languages, b.languages) &&
				a.crAdjustment === b.crAdjustment)
		);
	}
}
