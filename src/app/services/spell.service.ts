import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Spell from "../common/models/monster/traits/spells/spell";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { SpellSchool } from "../common/models/monster/classes/SpellData";

@Injectable({
	providedIn: "root"
})
export class SpellService {
	private baseUrl: string = "https://localhost:44377/api/Spells/";

	constructor(private http: HttpClient, private auth: AuthService) { }

	public getAllSpells(): Observable<Spell[]> {
		return this.http.get<Spell[]>(`${this.baseUrl}GetAll`, {
			headers: this.auth.getAuthHeader()
		});
	}

	public getSpellsByUser(): Observable<Spell[]> {
		return this.http.get<Spell[]>(`${this.baseUrl}`, {
			headers: this.auth.getAuthHeader()
		});
	}

	public getSpell(spellId: number): Observable<Spell> {
		return this.http.get<Spell>(`${this.baseUrl}${spellId}`, {
			headers: this.auth.getAuthHeader()
		});
	}

	public addSpell(spell: Spell): Observable<any> {
		return this.http.post<string>(`${this.baseUrl}`, spell, {
			headers: this.auth.getAuthHeader()
		});
	}

	public saveSpell(spell: Spell): Observable<any> {
		return this.http.put<string>(`${this.baseUrl}`, spell, {
			headers: this.auth.getAuthHeader()
		});
	}

	public deleteSpell(spell: Spell): Observable<any> {
		return this.http.delete<string>(`${this.baseUrl + spell.spellID}`, {
			headers: this.auth.getAuthHeader()
		});
	}
}
