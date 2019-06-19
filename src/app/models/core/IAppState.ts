import { AppUser } from "./appUser";
import { App } from "./app/app";

export interface IAppState {
	user: AppUser;
	app: App;
}
