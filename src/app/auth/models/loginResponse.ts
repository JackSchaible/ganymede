import { AppUser } from "src/app/models/core/appUser";
import ApiError from "src/app/services/http/apiError";

export class LoginResponse {
	public success: boolean;
	public token: string;
	public user: AppUser;
	public errors: ApiError[];
}
