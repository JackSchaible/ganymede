import { StorageKeys } from "../storage/localStorageKeys";
import { Injectable } from "@angular/core";
import { IAppState } from "../models/core/IAppState";
import MasterService from "./master.service";
import { HttpClient } from "@angular/common/http";
import { App } from "../models/core/App/app";
import { NgRedux } from "@angular-redux/store";
import { StateLoaderActions } from "../store/actions";

@Injectable({
	providedIn: "root"
})
export class StateLoaderService extends MasterService {
	protected baseUrl: string = this.apiUrl + "AppData";

	constructor(private client: HttpClient, private actions: StateLoaderActions) {
		super(client);
	}

	public loadState(store: NgRedux<IAppState>): void {
		const serializedState = localStorage.getItem(StorageKeys.state.state);

		if (serializedState === null) {
			this.http.get<App>(`${this.baseUrl}`).subscribe((app: App) => {
				const appLoadAction = this.actions.loadApp(app);
				store.dispatch(appLoadAction);
			});
		} else {
			const state: IAppState = JSON.parse(serializedState);
			const stateLoadAction = this.actions.loadState(state);
			store.dispatch(stateLoadAction);
		}
	}

	public saveState(state: IAppState) {
		try {
			const serializedState = JSON.stringify(state);
			localStorage.setItem(StorageKeys.state.state, serializedState);
		} catch (err) {}
	}
}
