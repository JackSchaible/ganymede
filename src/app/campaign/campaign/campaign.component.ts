import { Component, OnInit } from "@angular/core";
import { NgRedux, select } from "@angular-redux/store";
import { IAppState } from "src/app/models/core/IAppState";
import { Observable } from "rxjs";
import { Campaign } from "src/app/models/core/Campaign";

@Component({
	selector: "gm-campaign",
	templateUrl: "./campaign.component.html",
	styleUrls: ["./campaign.component.scss"]
})
export class CampaignComponent implements OnInit {
	@select(["app", "campaign"])
	public campaign$: Observable<Campaign>;

	constructor(private store: NgRedux<IAppState>) {}

	ngOnInit() {}
}
