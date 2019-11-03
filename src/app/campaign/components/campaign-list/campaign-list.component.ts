import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import { CampaignService } from "../../campaign.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { NgRedux, select } from "@angular-redux/store";
import { IAppState } from "src/app/models/core/iAppState";
import { CampaignActions } from "../../store/actions";
import { Campaign } from "src/app/campaign/models/campaign";
import { ListBaseComponent } from "src/app/common/baseComponents/listBaseComponent";
import { KeyboardService } from "src/app/services/keyboard/keyboard.service";
import { Location } from "@angular/common";
import { Key } from "ts-key-enum";

@Component({
	selector: "gm-campaign-list",
	templateUrl: "./campaign-list.component.html",
	styleUrls: ["./campaign-list.component.scss"]
})
export class CampaignListComponent
	extends ListBaseComponent<Campaign, CampaignActions, CampaignService>
	implements OnInit, AfterViewInit, OnDestroy {
	@select(["user", "campaigns"])
	public campaigns$: Observable<Campaign[]>;

	constructor(
		protected store: NgRedux<IAppState>,
		protected campaignService: CampaignService,
		protected actions: CampaignActions,
		protected router: Router,
		snackBar: MatSnackBar,
		dialog: MatDialog,
		location: Location,
		keyboardService: KeyboardService
	) {
		super(
			store,
			router,
			actions,
			campaignService,
			location,
			snackBar,
			dialog,
			keyboardService
		);
	}

	public ngOnInit() {
		super.ngOnInit();

		this.keySubscriptions.push({
			key: Key.Enter,
			modifierKeys: [Key.Control],
			callbackFn: () => this.select(this.getItem().id)
		});
	}

	public ngAfterViewInit() {
		super.ngAfterViewInit();
	}

	public ngOnDestroy() {
		super.ngOnDestroy();
	}

	protected constructEditUrl(): string {
		const campaignId = this.store.getState().user.campaigns[
			this.selectedItem
		];
		return `campaigns/edit/${campaignId}`;
	}

	protected getItem(): Campaign {
		const state = this.store.getState();
		return state.user.campaigns[this.selectedItem];
	}

	public select(campaignId: number): void {
		this.processing = true;

		this.campaignService.getCampaign(campaignId).subscribe(
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
}
