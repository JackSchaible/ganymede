import encounter from "./encounter";

export default class encounterGroup {
	constructor(
		public name: string,
		public description: string,
		public children: encounterGroup[],
		public encounters: encounter[]
	) {}
}
