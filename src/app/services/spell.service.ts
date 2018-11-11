import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import spell from "../common/models/monster/traits/spells/spell";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
	providedIn: "root"
})
export class SpellService {
	private baseUrl: string = "https://localhost:44377/api/Spells/";

	constructor(private http: HttpClient, private auth: AuthService) {}

	public getAllSpells(): Observable<spell[]> {
		return this.http.get<spell[]>(`${this.baseUrl}GetAll`, {
			headers: this.auth.getAuthHeader()
		});
	}

	public getSpellsByUser(): Observable<spell[]> {
		return this.http.get<spell[]>(`${this.baseUrl}`, {
			headers: this.auth.getAuthHeader()
		});
	}

	public addSpell(spell: spell): Observable<any> {
		return this.http.post<string>(`${this.baseUrl}`, spell, {
			headers: this.auth.getAuthHeader()
		});
	}

	public saveSpell(spell: spell): Observable<any> {
		return this.http.put<string>(`${this.baseUrl}`, spell, {
			headers: this.auth.getAuthHeader()
		});
	}

	public deleteSpell(spell: spell): Observable<any> {
		return this.http.delete<string>(`${this.baseUrl + spell.id}`, {
			headers: this.auth.getAuthHeader()
		});
	}
}
