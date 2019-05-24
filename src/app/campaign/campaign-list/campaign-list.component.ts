import { Component, OnInit } from "@angular/core";
import { Campaign } from "../models/campaign";
import { CampaignService } from "../campaign.service";
import { Router } from "@angular/router";

@Component({
	selector: "gm-campaign-list",
	templateUrl: "./campaign-list.component.html",
	styleUrls: ["./campaign-list.component.scss"]
})
export class CampaignListComponent implements OnInit {
	public campaigns: Campaign[];

	constructor(private service: CampaignService, private router: Router) {}

	ngOnInit() {
		this.service.ListCampaigns().subscribe(campaigns => {
			this.campaigns = campaigns;
		});
	}

	public edit(campaignId: number): void {
		this.router.navigateByUrl(`/campaign/${campaignId}`);
	}

	public delete(id: number): void {}
}
