import spellData from "../SpellData";
import spellcastingClass from "../SpellcastingClass";

export default class cleric extends spellcastingClass {
	constructor() {
		super(
			"Cleric",
			"Wisdom",
			spellData.spellSlotAdvancement.fullCaster,
			spellData.cantrips.clericWizard
		);
	}
}
