import { Publisher } from "src/app/campaign/models/publisher";

export class Ruleset {
	public id: number;
	public name: string;
	public abbreviation: string;
	public releaseDate: Date;
	public publisher: Publisher;
}
