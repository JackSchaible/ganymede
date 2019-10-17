import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResponse } from "../services/http/apiResponse";
import { Campaign } from "./models/campaign";
import FormService from "../services/form.service";

@Injectable({
	providedIn: "root"
})
export class CampaignService extends FormService<Campaign> {
	protected baseUrl: string = this.apiUrl + "Campaign";

	constructor(private client: HttpClient) {
		super(client);
	}

	public listCampaigns(): Observable<Campaign[]> {
		return this.client.get<Campaign[]>(`${this.baseUrl}/list`);
	}

	public getCampaign(id: number): Observable<Campaign> {
		return this.client.get<Campaign>(`${this.baseUrl}/get/${id}`);
	}

	public save(campaign: Campaign): Observable<ApiResponse> {
		return this.client.put<ApiResponse>(`${this.baseUrl}/save`, campaign);
	}

	public deleteCampaign(id: number): Observable<ApiResponse> {
		return this.client.delete<ApiResponse>(`${this.baseUrl}/delete/${id}`);
	}
}
