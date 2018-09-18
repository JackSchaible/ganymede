import Description from "./description";

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
	public ExtraMovementTypes: string[];
	public AC: number;
	public HP: number;
	public HPRoll: string;
	public ArmorType: string;

	public Senses: string;
	public Skills: Description[];
	public Features: Description[];
	public Actions: Description[];
	public LegendaryActionsDescription: string;
	public LegendaryActions: Description[];

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
		extraMovementTypes: string[],
		ac: number,
		armorType: string,
		hp: number,
		hpRoll: string,
		senses: string,
		skills: Description[],
		features: Description[],
		actions: Description[],
		legendaryActionsDescription: string,
		legendaryActions: Description[]
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
		this.ExtraMovementTypes = extraMovementTypes;
		this.AC = ac;
		this.ArmorType = armorType;
		this.HP = hp;
		this.HPRoll = hpRoll;

		this.Senses = senses;
		this.Skills = skills;
		this.Features = features;
		this.Actions = actions;
		this.LegendaryActions = legendaryActions;
		this.LegendaryActionsDescription = legendaryActionsDescription;
	}
}
