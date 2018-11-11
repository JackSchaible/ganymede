import extraFeature from "./extraFeature";
import sense from "./sense";
import skill from "./skill";
import languages from "./languages";

export default class features {
	constructor(
		public savingThrows: skill[],
		public skills: skill[],
		public damageVulnerabilities: string[],
		public damageResistances: string[],
		public damageImmunities: string[],
		public conditionImmunities: string[],
		public extraSenses: sense[],
		public languages: languages,
		public extraFeatures: extraFeature[],
		public challenge: number
	) {}
}
