import { Campaign } from "../../campaign/models/campaign";

export class AppUser {
	public email: string;
	public campaigns: Campaign[];

	public static getDefault(): AppUser {
		return {
			email: null,
			campaigns: []
		};
	}
}
