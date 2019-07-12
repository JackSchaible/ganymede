import { Component, OnInit } from "@angular/core";
import { CampaignService } from "../campaign.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ModalComponent } from "src/app/common/modal/modal.component";
import { ModalModel } from "src/app/common/models/modalModel";
import SnackbarModel from "src/app/common/models/snackbarModel";
import { SnackbarComponent } from "src/app/common/snackbar/snackbar.component";
import { Observable } from "rxjs";
import { NgRedux, select } from "@angular-redux/store";
import { IAppState } from "src/app/models/core/iAppState";
import { CampaignActions } from "../store/actions";
import { Campaign } from "src/app/models/core/campaign";

@Component({
	selector: "gm-campaign-list",
	templateUrl: "./campaign-list.component.html",
	styleUrls: ["./campaign-list.component.scss"]
})
export class CampaignListComponent implements OnInit {
	@select(["user", "campaigns"])
	public campaigns$: Observable<Campaign[]>;
	public processing: boolean;

	constructor(
		private service: CampaignService,
		private router: Router,
		private dialog: MatDialog,
		private snackBar: MatSnackBar,
		private store: NgRedux<IAppState>,
		private actions: CampaignActions
	) {}

	ngOnInit() {}

	public select(campaignId: number): void {
		this.processing = true;

		this.service.getCampaign(campaignId).subscribe(
			(campaign: Campaign) => {
				this.processing = false;
				this.store.dispatch(this.actions.selectCampaign(campaign));
				this.router.navigateByUrl(`campaigns/${campaignId}`);
			},
			() => {
				this.processing = false;
				this.openSnackbar(
					"exclamation-triangle",
					"An error occurred while opening your campaign!"
				);
			}
		);
	}

	public edit(campaignId: number): void {
		this.store.dispatch(this.actions.editCampaign(campaignId));
		this.router.navigateByUrl(`/campaigns/edit/${campaignId}`);
	}

	public delete(campaign: Campaign): void {
		const model: ModalModel = {
			title: "Confirm Delete",
			content: `<p>Are you sure you wish to delete ${campaign.name}?`,
			closeButton: {
				icon: null,
				color: "primary",
				titleText: "Close",
				onClick: () => {}
			},
			buttons: [
				{
					icon: "trash-alt",
					color: "warn",
					titleText: "Delete",
					onClick: () => {
						this.confirmDelete(campaign);
					}
				}
			]
		};

		this.dialog.open(ModalComponent, {
			data: model
		});
	}

	private confirmDelete(campaign: Campaign): void {
		this.processing = true;
		this.service.deleteCampaign(campaign.id).subscribe(
			() => {
				this.store.dispatch(this.actions.deleteCampaign(campaign.id));
				this.processing = false;
			},
			() => {
				this.processing = false;
				this.openSnackbar(
					"exclamation-triangle",
					`An error occurred while deleting ${campaign.name}!`
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
