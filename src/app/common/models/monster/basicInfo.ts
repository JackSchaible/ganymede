import alignment from "./alignment";

export default class basicInfo {
	constructor(
		public name: string,
		public xp: number,
		public type: string,
		public tags: string[],
		public alignment: alignment,
		public size: string,
		public proficiencyModifier: number
	) {}
}
