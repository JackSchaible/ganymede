import Attack from "./attack";
import Feature from "./feature";

export default class Monster {
	public IsPlayer: boolean;
	public InitiativeRoll: number;

	public Name: string;
	public Challenge: number;
	public XP: number;
	public Type: string;
	public Race: string;
	public Size: string;

	public Strength: number;
	public Dexterity: number;
	public Constitution: number;
	public Intelligence: number;
	public Wisdom: number;
	public Charisma: number;
	public Initiative: number;
	public Speed: number;
	public AC: number;
	public Attacks: Attack[];
	public FeaturesAndSkills: Feature[];

	constructor(
		isPlayer: boolean,
		initiativeRoll: number,
		name: string,
		challenge: number,
		xp: number,
		type: string,
		race: string,
		size: string,
		strength: number,
		dexterity: number,
		constitution: number,
		intelligence: number,
		wisdom: number,
		charisma: number,
		initiative: number,
		speed: number,
		ac: number,
		attacks: Attack[],
		featuresAndSkills: Feature[]
	) {
		this.IsPlayer = isPlayer;
		this.InitiativeRoll = initiativeRoll;

		this.Name = name;
		this.Challenge = challenge;
		this.XP = xp;
		this.Type = type;
		this.Race = race;
		this.Size = size;

		this.Strength = strength;
		this.Dexterity = dexterity;
		this.Constitution = constitution;
		this.Intelligence = intelligence;
		this.Wisdom = wisdom;
		this.Charisma = charisma;
		this.Initiative = initiative;
		this.Speed = speed;
		this.AC = ac;
		this.Attacks = attacks;
		this.FeaturesAndSkills = featuresAndSkills;
	}
}
