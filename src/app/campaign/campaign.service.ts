import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Campaign } from "./models/campaign";
import MasterService from "../services/master.service";
import { CampaignEditModel } from "./models/campaignEdit.model";
import ApiError from "../services/http/apiError";
import { map } from "rxjs/operators";
import { ApiResponse } from "../services/http/apiResponse";

@Injectable({
	providedIn: "root"
})
export class CampaignService extends MasterService {
	protected baseUrl: string = this.apiUrl + "Campaign/";

	constructor(private client: HttpClient) {
		super(client);
	}

	public ListCampaigns(): Observable<Campaign[]> {
		return this.client.get<Campaign[]>(`${this.baseUrl}`);
	}

	public GetCampaign(id: number): Observable<CampaignEditModel> {
		return this.client.get<CampaignEditModel>(`${this.baseUrl}/${id}`);
	}

	public SaveCampaign(campaign: Campaign): Observable<ApiResponse> {
		return this.client.put<ApiResponse>(`${this.baseUrl}`, campaign);
	}
}
