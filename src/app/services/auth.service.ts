import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import ApiError from "./http/apiError";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	public isLoggedIn: boolean = false;
	public redirectUrl: string;

	// TODO: How to change in prod?
	private apiUrl: string = "https://localhost:44377/api/Account";
	private currentUserKey: string = "currentUser";

	constructor(private http: HttpClient) {}

	login(username: string, password: string): Observable<boolean> {
		var url = this.apiUrl + "/login";
		return this.http.post(url, { email: username, password: password }).pipe(
			map(r => {
				if (r) {
					let json = JSON.parse(JSON.stringify(r));

					if (json.token) {
						this.isLoggedIn = true;

						let user = {
							token: json.token,
							expiry: new Date(new Date().getTime() + 1000 * 3600 * 24 * 30),
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

	register(
		username: string,
		password: string
	): Observable<boolean | ApiError[]> {
		return this.http
			.post(this.apiUrl + "/register", {
				email: username,
				password: password
			})
			.pipe(
				map(r => {
					if (r) {
						const json = JSON.parse(JSON.stringify(r));

						if (json.token) {
							this.isLoggedIn = true;

							const user = {
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

	logout(): void {
		localStorage.removeItem(this.currentUserKey);
		this.isLoggedIn = false;
	}

	getAuthHeader(): void {}

	getUser() {
		if (!localStorage) return;

		if (localStorage.getItem(this.currentUserKey))
			return JSON.parse(localStorage.getItem(this.currentUserKey));
	}
}
