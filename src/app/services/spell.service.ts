import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Spell from "../common/models/monster/traits/spells/spell";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class SpellService {
	private baseUrl: string = "https://localhost:44377/";

	constructor(private http: HttpClient) {}

	public getAllSpells(): Observable<Spell[]> {
		return this.http.get<Spell[]>(`${this.baseUrl}GetAll`);
	}

	public getSpellsByUser(): Observable<Spell[]> {
		return this.http.get<Spell[]>(`${this.baseUrl}`);
	}
}
