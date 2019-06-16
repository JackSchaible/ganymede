import { Component, OnInit } from "@angular/core";
import { CampaignService } from "../campaign.service";
import { ActivatedRoute } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { ApiResponse } from "../../services/http/apiResponse";
import ApiCodes from "../../services/http/apiCodes";
import { MatSnackBar } from "@angular/material";
import { SnackbarComponent } from "../../common/snackbar/snackbar.component";
import SnackbarModel from "../../common/models/snackbarModel";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "src/app/models/core/IAppState";
import { CampaignActions } from "../store/actions";
import { Campaign } from "src/app/models/core/campaign";
import { Ruleset } from "src/app/models/core/Rulesets/Ruleset";

@Component({
	selector: "gm-campaign-edit",
	templateUrl: "./campaign-edit.component.html",
	styleUrls: ["./campaign-edit.component.scss"]
})
export class CampaignEditComponent implements OnInit {
	public processing: boolean;
	public campaign: Campaign;
	public rulesets: Ruleset[];
	public isNew: boolean;

	public group: FormGroup;

	constructor(
		private service: CampaignService,
		private route: ActivatedRoute,
		private snackBar: MatSnackBar,
		private redux: NgRedux<IAppState>,
		private actions: CampaignActions
	) {}

	ngOnInit() {
		this.processing = true;
		const id: number = parseInt(this.route.snapshot.paramMap.get("id"), 10);

		if (id) {
			this.isNew = id === -1;
			// todo: get campaign from store

			// this.service.getCampaign(id).subscribe(
			// 	campaignModel => {
			// 		this.campaign = campaignModel.campaign;
			// 		this.rulesets = campaignModel.rulesets;
			// 		this.processing = false;
			// 	},
			// 	() => (this.processing = false)
			// );
		} else this.processing = false;
	}

	public save(): void {
		this.processing = true;

		if (this.isNew) this.campaign.id = -1;

		this.service.saveCampaign(this.campaign).subscribe(
			(response: ApiResponse) => {
				this.processing = false;

				if (response) {
					if (response.statusCode === ApiCodes.Ok) {
						this.openSnackbar(
							"check-square",
							`${this.campaign.name} was successfully saved!`
						);

						if (this.isNew) {
							this.isNew = false;
							this.campaign.id = response.insertedID;
						}
					} else
						this.openSnackbar(
							"exclamation-triangle",
							`An error occurred while saving ${this.campaign.name}!`
						);
				} else
					this.openSnackbar(
						"exclamation-triangle",
						`An error occurred while saving ${this.campaign.name}!`
					);
			},
			() => {
				this.processing = false;
				this.openSnackbar(
					"exclamation-triangle",
					`An error occurred while saving ${this.campaign.name}!`
				);
			}
		);
	}

	private openSnackbar(icon: string, message: string): void {
		let textClass = "text-info";

		switch (icon) {
			case "check-square":
				textClass = "text-success";
				break;

			case "exclamation-triangle":
				textClass = "text-danger";
				break;
		}

		const options: SnackbarModel = {
			icon: icon,
			message: message,
			textClass: textClass
		};

		this.snackBar.openFromComponent(SnackbarComponent, {
			data: options,
			duration: 5000
		});
	}
}
