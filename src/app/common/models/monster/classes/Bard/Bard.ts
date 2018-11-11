import spellcastingClass from "../SpellcastingClass";
import spellData from "../SpellData";

export default class bard extends spellcastingClass {
	constructor() {
		super(
			"Bard",
			"Charisma",
			spellData.spellSlotAdvancement.fullCaster,
			spellData.cantrips.bardDruid
		);
	}
}
