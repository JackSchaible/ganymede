import { SpellSchool } from "../../../spells/spellSchool";

export class SpellFormData {
	public schools: SpellSchool[];
	public castingTimeUnits: string[];

	static getDefault(): SpellFormData {
		return {
			schools: [],
			castingTimeUnits: []
		};
	}
}
