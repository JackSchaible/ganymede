import { AppUser } from "./AppUser";
import { App } from "./App/app";

export interface IAppState {
	user: AppUser;
	app: App;
}
