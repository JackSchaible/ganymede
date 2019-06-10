import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import ApiError from "../services/http/apiError";
import MasterService from "../services/master.service";
import { User } from "./models/user";
import { LoginResponse } from "./models/loginResponse";
import { StorageKeys } from "../storage/localStorageKeys";
import { AppUser } from "../models/core/AppUser";

@Injectable({
	providedIn: "root"
})
export class AuthService extends MasterService {
	public isLoggedIn: boolean = false;
	public redirectUrl: string;

	protected baseUrl: string = this.apiUrl + "Account/";

	constructor(http: HttpClient) {
		super(http);
	}

	public login(username: string, password: string): Observable<LoginResponse> {
		const url = this.baseUrl + "login";
		return this.http.post(url, { email: username, password: password }).pipe(
			map((response: LoginResponse) => {
				if (response.success) {
					this.isLoggedIn = true;
					const user: User = {
						token: response.token,
						expiry: new Date(new Date().getTime() + 2592000000),
						user: username
					};

					localStorage.setItem(StorageKeys.auth.user, JSON.stringify(user));
				}

				return response;
			})
		);
	}

	public register(
		username: string,
		password: string
	): Observable<boolean | ApiError[]> {
		return this.http
			.post(this.baseUrl + "register", {
				email: username,
				password: password
			})
			.pipe(
				map(r => {
					if (r) {
						const json = JSON.parse(JSON.stringify(r));

						if (json.token) {
							this.isLoggedIn = true;

							const user: User = {
								token: json.token,
								expiry: new Date(new Date().getTime() + 1000 * 3600 * 24 * 30),
								user: username
							};

							localStorage.setItem(StorageKeys.auth.user, JSON.stringify(user));
							return true;
						} else if (json.errors) {
							return json.errors;
						}
					} else return false;
				})
			);
	}

	public getUserData(): Observable<AppUser> {
		return this.http.get<AppUser>(`${this.baseUrl}GetUserData`);
	}

	public logout(): void {
		localStorage.removeItem(StorageKeys.auth.user);
		this.isLoggedIn = false;
	}

	public getAuthHeader(): HttpHeaders {
		const user = JSON.parse(localStorage.getItem(StorageKeys.auth.user));
		return new HttpHeaders({
			Authorization: `Bearer ${user.token}`
		});
	}

	public getUser(): User {
		if (!localStorage) return;

		if (localStorage.getItem(StorageKeys.auth.user))
			return JSON.parse(localStorage.getItem(StorageKeys.auth.user));
	}
}
