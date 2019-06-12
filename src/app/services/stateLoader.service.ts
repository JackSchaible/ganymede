import { AppUser } from "../models/core/AppUser";
import { StorageKeys } from "../storage/localStorageKeys";
import { Injectable } from "@angular/core";
import { IAppState } from "../models/core/IAppState";

@Injectable({
	providedIn: "root"
})
export class StateLoaderService {
	constructor() {}

	public loadState(): IAppState {
		const serializedState = localStorage.getItem(StorageKeys.state.state);

		let state: IAppState;
		if (serializedState === null) state = { user: new AppUser() };
		else state = JSON.parse(serializedState);

		return state;
	}

	public saveState(state: IAppState) {
		try {
			const serializedState = JSON.stringify(state);
			localStorage.setItem(StorageKeys.state.state, serializedState);
		} catch (err) {}
	}

	public middleware = store => next => action => {
		//todo: how to get post-reducer state?
		console.log(store.getState());
		this.saveState(store);
		return next(action);
	};
}
