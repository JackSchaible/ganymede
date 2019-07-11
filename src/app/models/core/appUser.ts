import { Campaign } from "./campaign";

export default class AppUser {
	public email: string;
	public campaigns: Campaign[];

	public static getDefault(): AppUser {
		return {
			email: null,
			campaigns: []
		};
	}
}
