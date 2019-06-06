import { Publisher } from "./publisher";

export class Ruleset {
	public id: number;
	public name: string;
	public abbreviation: string;
	public releaseDate: Date;
	public publisher: Publisher;

	constructor() {
		this.id = this.name = this.abbreviation = this.releaseDate = null;
		this.publisher = new Publisher();
	}
}
