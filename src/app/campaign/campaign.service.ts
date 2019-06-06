import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Campaign } from "./models/campaign";
import MasterService from "../services/master.service";
import { CampaignEditModel } from "./models/campaignEdit.model";
import { ApiResponse } from "../services/http/apiResponse";

@Injectable({
	providedIn: "root"
})
export class CampaignService extends MasterService {
	protected baseUrl: string = this.apiUrl + "Campaign";

	constructor(private client: HttpClient) {
		super(client);
	}

	public listCampaigns(): Observable<Campaign[]> {
		return this.client.get<Campaign[]>(`${this.baseUrl}/list`);
	}

	public getCampaign(id: number): Observable<CampaignEditModel> {
		return this.client.get<CampaignEditModel>(`${this.baseUrl}/get/${id}`);
	}

	public saveCampaign(campaign: Campaign): Observable<ApiResponse> {
		return this.client.put<ApiResponse>(`${this.baseUrl}/save`, campaign);
	}

	public cloneCampaign(id: number): Observable<Campaign> {
		return this.client.get<Campaign>(`${this.baseUrl}/clone/${id}`);
	}

	public deleteCampaign(id: number): Observable<ApiResponse> {
		return this.client.delete<ApiResponse>(`${this.baseUrl}/delete/${id}`);
	}
}
