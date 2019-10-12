import { Injectable } from "@angular/core";
import { Spell } from "src/app/campaign/modules/spell/models/spell";
import { Observable } from "rxjs";
import { ApiResponse } from "src/app/services/http/apiResponse";
import { HttpClient } from "@angular/common/http";
import MasterService from "src/app/services/master.service";

@Injectable({
	providedIn: "root"
})
export class SpellService extends MasterService {
	protected baseUrl: string = this.apiUrl + "Spell";

	constructor(protected http: HttpClient) {
		super(http);
	}

	public save(spell: Spell, campaignId: number): Observable<ApiResponse> {
		return this.http.put<ApiResponse>(`${this.baseUrl}/save`, {
			spell: spell,
			campaignId: campaignId
		});
	}
}
