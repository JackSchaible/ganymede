import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Monster } from "./models/monster";

@Injectable({
	providedIn: "root"
})
export class MonsterService {
	constructor() {}

	public getMonsters(campaignId: number): Observable<Monster[]> {
		return of([
			{
				name: "Torrasque",
				description: "A terrifying, immortal monster",
				basicStats: {
					cr: 20,
					xp: 40000,
					strength: 20,
					dexterity: 16,
					constitution: 18,
					intelligence: 8,
					wisdom: 12,
					charisma: 9
				}
			}
		]);
	}
}
