import { Publisher } from "./Publisher";

export class Ruleset {
	public id: number;
	public name: string;
	public abbreviation: string;
	public releaseDate: Date;
	public publisher: Publisher;
}
