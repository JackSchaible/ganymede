import { AppUser } from "../models/core/AppUser";
import { StorageKeys } from "../storage/localStorageKeys";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Observable, of } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class StateLoaderService {
	constructor(private auth: AuthService) {}

	public loadState(): Observable<AppUser> {
		try {
			const serializedState = localStorage.getItem(StorageKeys.state.state);

			let state: Observable<AppUser>;
			if (serializedState === null) state = this.auth.getUserData();
			else state = of(JSON.parse(serializedState));

			return state;
		} catch (err) {
			return this.auth.getUserData();
		}
	}

	public saveState(state: AppUser) {
		try {
			const serializedState = JSON.stringify(state);
			localStorage.setItem(StorageKeys.state.state, serializedState);
		} catch (err) {}
	}
}
