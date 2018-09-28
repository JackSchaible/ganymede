import ExtraFeature from "./extraFeature";
import Sense from "./sense";
import Skill from "./skill";

export default class Features {
	constructor(
		public SavingThrows: Skill[],
		public Skills: Skill[],
		public DamageResistances: string[],
		public DamageImmunities: string[],
		public DamageVulnerabilities: string[],
		public ConditionImmunities: string[],
		public ExtraSenses: Sense[],
		public Languages: string[],
		public ExtraFeatures: ExtraFeature[],
		public Challenge: number
	) {}
}
