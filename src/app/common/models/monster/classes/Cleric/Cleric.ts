import SpellData from "../SpellData";
import SpellcastingClass from "../SpellcastingClass";

export default class Cleric extends SpellcastingClass {
	constructor() {
		super(
			"Cleric",
			"Wisdom",
			SpellData.SpellSlotAdvancement.FullCaster,
			SpellData.Cantrips.ClericWizard
		);
	}
}
