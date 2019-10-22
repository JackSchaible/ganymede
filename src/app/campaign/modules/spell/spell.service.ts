import { Injectable } from "@angular/core";
import { Spell } from "src/app/campaign/modules/spell/models/spell";
import { Observable } from "rxjs";
import { ApiResponse } from "src/app/services/http/apiResponse";
import { HttpClient } from "@angular/common/http";
import FormService from "src/app/services/form.service";
import * as _ from "lodash";

@Injectable({
	providedIn: "root"
})
export class SpellService extends FormService<Spell> {
	protected baseUrl: string = this.apiUrl + "Spell";

	constructor(protected http: HttpClient) {
		super(http);
	}

	public save(spell: Spell): Observable<ApiResponse> {
		const saveSpell = _.cloneDeep(spell);
		saveSpell.monsterSpells = null;
		return this.http.put<ApiResponse>(`${this.baseUrl}/save`, saveSpell);
	}
}
