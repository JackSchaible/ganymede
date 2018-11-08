import Encounter from "./encounter";

export default class EncounterGroup {
	constructor(
		public Name: string,
		public Description: string,
		public Children: EncounterGroup[],
		public Encounters: Encounter[]
	) {}
}
