import { Forms } from "./forms/forms";
import { Campaign } from "../../../campaign/models/campaign";

export class App {
	public forms: Forms;
	public campaign: Campaign;

	public static getDefault(): App {
		return {
			forms: Forms.getDefault(),
			campaign: Campaign.getDefault()
		};
	}
}
