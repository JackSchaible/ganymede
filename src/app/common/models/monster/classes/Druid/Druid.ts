import spellcastingClass from "../SpellcastingClass";
import spellData from "../SpellData";

export default class druid extends spellcastingClass {
	constructor() {
		super(
			"Druid",
			"Wisdom",
			spellData.spellSlotAdvancement.fullCaster,
			spellData.cantrips.bardDruid
		);
	}
}
