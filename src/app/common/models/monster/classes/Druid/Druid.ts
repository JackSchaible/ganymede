import SpellcastingClass from "../SpellcastingClass";
import SpellData from "../SpellData";

export default class Druid extends SpellcastingClass {
	constructor() {
		super(
			"Druid",
			"Wisdom",
			SpellData.SpellSlotAdvancement.FullCaster,
			SpellData.Cantrips.BardDruid
		);
	}
}
