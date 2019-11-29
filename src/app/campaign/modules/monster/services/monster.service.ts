import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Monster } from "../models/monster";
import FormService from "src/app/services/form.service";
import { HttpClient } from "@angular/common/http";
import { ApiResponse } from "src/app/services/http/apiResponse";
import * as _ from "lodash";

@Injectable({
	providedIn: "root"
})
export class MonsterService extends FormService<Monster> {
	protected baseUrl: string = this.apiUrl + "Monster";

	constructor(protected http: HttpClient) {
		super(http);
	}

	public save(monster: Monster): Observable<ApiResponse> {
		const saveMonster = _.cloneDeep(monster);
		return this.http.put<ApiResponse>(`${this.baseUrl}/save`, saveMonster);
	}

	public delete(monsterId: number): Observable<ApiResponse> {
		return this.http.delete<ApiResponse>(
			`${this.baseUrl}/delete/${monsterId}`
		);
	}
}
