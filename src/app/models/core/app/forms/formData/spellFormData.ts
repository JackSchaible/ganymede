import { SpellSchool } from "../../../../../campaign/modules/spell/models/spellSchool";

export class SpellFormData {
	public schools: SpellSchool[];
	public castingTimeUnits: string[];
	public rangeTypes: string[];
	public rangeUnits: string[];
	public rangeShapes: string[];
	public durations: string[];

	static getDefault(): SpellFormData {
		return {
			schools: [],
			castingTimeUnits: [],
			rangeTypes: [],
			rangeUnits: [],
			rangeShapes: [],
			durations: []
		};
	}
}
