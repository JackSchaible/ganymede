import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import ApiError from "./http/apiError";
import MasterService from "./master.service";
import { User } from "../auth/models/user";

@Injectable({
	providedIn: "root"
})
export class AuthService extends MasterService {
	public isLoggedIn: boolean = false;
	public redirectUrl: string;

	private currentUserKey: string = "currentUser";
	protected baseUrl: string = this.apiUrl + "Account/";

	constructor(http: HttpClient) {
		super(http);
	}

	public login(username: string, password: string): Observable<boolean> {
		const url = this.baseUrl + "login";
		return this.http.post(url, { email: username, password: password }).pipe(
			map(r => {
				if (r) {
					const json = JSON.parse(JSON.stringify(r));

					if (json.token) {
						this.isLoggedIn = true;

						const user: User = {
							token: json.token,
							expiry: new Date(new Date().getTime() + 2592000000),
							user: username
						};

						localStorage.setItem(this.currentUserKey, JSON.stringify(user));
						return true;
					} else if (json.error) {
						return false;
					}
				} else return false;
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

							localStorage.setItem(this.currentUserKey, JSON.stringify(user));
							return true;
						} else if (json.errors) {
							return json.errors;
						}
					} else return false;
				})
			);
	}

	public logout(): void {
		localStorage.removeItem(this.currentUserKey);
		this.isLoggedIn = false;
	}

	public getAuthHeader(): HttpHeaders {
		const user = JSON.parse(localStorage.getItem(this.currentUserKey));
		return new HttpHeaders({
			Authorization: `Bearer ${user.token}`
		});
	}

	public getUser(): User {
		if (!localStorage) return;

		if (localStorage.getItem(this.currentUserKey))
			return JSON.parse(localStorage.getItem(this.currentUserKey));
	}
}
