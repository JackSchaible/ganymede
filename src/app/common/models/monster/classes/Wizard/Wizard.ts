import SpellcastingClass from "../SpellcastingClass";
import SpellData from "../SpellData";

export default class Wizard extends SpellcastingClass {
	constructor() {
		super(
			"Wizard",
			"Intelligence",
			SpellData.SpellSlotAdvancement.FullCaster,
			SpellData.Cantrips.ClericWizard
		);
	}
}
