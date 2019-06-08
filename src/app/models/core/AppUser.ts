import { Campaign } from "src/app/campaign/models/campaign";

export class AppUser {
	public campaigns: Campaign[];
}

export function getDefaultState(): AppUser {
	return {
		campaigns: []
	};
}
