import { AppUser } from "src/app/models/core/AppUser";

export class LoginResponse {
	public success: boolean;
	public token: string;
	public user: AppUser;
}
