import { Component, OnInit } from "@angular/core";
import { CampaignService } from "../campaign.service";
import { ActivatedRoute } from "@angular/router";
import { ApiResponse } from "../../services/http/apiResponse";
import ApiCodes from "../../services/http/apiCodes";
import { MatSelectChange } from "@angular/material/select";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../../common/snackbar/snackbar.component";
import SnackbarModel from "../../common/models/snackbarModel";
import { NgRedux, select } from "@angular-redux/store";
import { IAppState } from "src/app/models/core/iAppState";
import { CampaignActions } from "../store/actions";
import { Campaign } from "src/app/models/core/campaign";
import { Ruleset } from "src/app/models/core/rulesets/ruleset";
import { Observable } from "rxjs";

@Component({
	selector: "gm-campaign-edit",
	templateUrl: "./campaign-edit.component.html",
	styleUrls: ["./campaign-edit.component.scss"]
})
export class CampaignEditComponent implements OnInit {
	@select(["app", "forms", "campaignForm"])
	public campaign$: Observable<Campaign>;
	@select(["app", "rulesets"])
	public rulesets$: Observable<Ruleset[]>;

	public processing: boolean;
	public rulesetId: number;
	public isNew: boolean;

	constructor(
		private service: CampaignService,
		private route: ActivatedRoute,
		private snackBar: MatSnackBar,
		private store: NgRedux<IAppState>,
		private actions: CampaignActions
	) {}

	ngOnInit() {
		this.campaign$.subscribe((c: Campaign) => {
			this.rulesetId = c.rulesetID;
			this.isNew = c.id === -1;
		});
	}

	public save(): void {
		this.processing = true;

		const campaign = this.store.getState().app.forms.campaignForm;
		this.service.saveCampaign(campaign).subscribe(
			(response: ApiResponse) => {
				this.processing = false;
				if (response) {
					if (response.statusCode === ApiCodes.Ok) {
						this.openSnackbar(
							"check-square",
							`${campaign.name} was successfully saved!`
						);

						const wasNew = this.isNew;

						if (this.isNew) {
							this.isNew = false;
							campaign.id = response.insertedID;
						}

						this.store.dispatch(this.actions.saveCampaign(campaign, wasNew));
					} else
						this.openSnackbar(
							"exclamation-triangle",
							`An error occurred while saving ${campaign.name}!`
						);
				} else
					this.openSnackbar(
						"exclamation-triangle",
						`An error occurred while saving ${campaign.name}!`
					);
			},
			() => {
				this.processing = false;
				this.openSnackbar(
					"exclamation-triangle",
					`An error occurred while saving ${campaign.name}!`
				);
			}
		);
	}

	public rulesetChanged(): void {
		this.store.dispatch(this.actions.editCampaignSetRuleset(this.rulesetId));
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
