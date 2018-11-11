import spellcastingClass from "../SpellcastingClass";
import spellData from "../SpellData";

export default class wizard extends spellcastingClass {
	constructor() {
		super(
			"Wizard",
			"Intelligence",
			spellData.spellSlotAdvancement.fullCaster,
			spellData.cantrips.clericWizard
		);
	}
}
