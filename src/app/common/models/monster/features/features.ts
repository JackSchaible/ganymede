import ExtraFeature from "./extraFeature";
import Sense from "./sense";
import Skill from "./skill";
import Languages from "./languages";

export default class Features {
	constructor(
		public SavingThrows: Skill[],
		public Skills: Skill[],
		public DamageVulnerabilities: string[],
		public DamageResistances: string[],
		public DamageImmunities: string[],
		public ConditionImmunities: string[],
		public ExtraSenses: Sense[],
		public Languages: Languages,
		public ExtraFeatures: ExtraFeature[],
		public Challenge: number
	) {}
}
