import Encounter from "./encounter";

export default class EncounterGroup {
	public Name: string;
	public Description: string;

	public Children: EncounterGroup[];
	public Encounters: Encounter[];

	constructor(
		name: string,
		description: string,
		children: EncounterGroup[],
		encounters: Encounter[]
	) {
		this.Name = name;
		this.Description = description;
		this.Children = children;
		this.Encounters = encounters;
	}
}
