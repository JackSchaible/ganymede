import Monster from "./monster";

export default class Encounter {
	public Name: string;
	public Difficulty: string;
	public XP: number;
	public Location: number;
	public Monsters: Monster[];
	public Notes: string;

	constructor(
		name: string,
		difficulty: string,
		xp: number,
		location: number,
		monsters: Monster[],
		notes: string
	) {
		this.Name = name;
		this.Difficulty = difficulty;
		this.XP = xp;
		this.Location = location;
		this.Monsters = monsters;
		this.Notes = notes;
	}
}
