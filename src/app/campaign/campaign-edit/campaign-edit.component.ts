import { Component, OnInit } from "@angular/core";
import { CampaignService } from "../campaign.service";
import { ActivatedRoute } from "@angular/router";
import { Campaign } from "../models/campaign";
import { FormControl, FormGroup } from "@angular/forms";
import { Ruleset } from "../models/ruleset";

@Component({
	selector: "gm-campaign-edit",
	templateUrl: "./campaign-edit.component.html",
	styleUrls: ["./campaign-edit.component.scss"]
})
export class CampaignEditComponent implements OnInit {
	public processing: boolean;
	public campaign: Campaign;
	public rulesets: Ruleset[];

	public group: FormGroup;

	constructor(
		private service: CampaignService,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.processing = true;
		const id: number = parseInt(this.route.snapshot.paramMap.get("id"), 10);

		if (id)
			this.service.GetCampaign(id).subscribe(
				campaignModel => {
					this.campaign = campaignModel.campaign;
					this.rulesets = campaignModel.rulesets;
				},
				() => {},
				() => {
					this.processing = false;
				}
			);
		else this.processing = false;
	}
}
