import { Component, OnInit, OnDestroy } from "@angular/core";
import { CampaignService } from "../../campaign.service";
import { NgRedux, select } from "@angular-redux/store";
import { IAppState } from "src/app/models/core/iAppState";
import { CampaignActions } from "../../store/actions";
import { Campaign } from "src/app/campaign/models/campaign";
import { Ruleset } from "src/app/models/core/rulesets/ruleset";
import { Observable } from "rxjs";
import { SnackBarService } from "src/app/services/snackbar.service";
import FormBaseComponent from "src/app/common/baseComponents/formBase";
import { Location } from "@angular/common";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { KeyboardService } from "src/app/services/keyboard/keyboard.service";

@Component({
	selector: "gm-campaign-edit",
	templateUrl: "./campaign-edit.component.html",
	styleUrls: ["./campaign-edit.component.scss"]
})
export class CampaignEditComponent
	extends FormBaseComponent<Campaign, CampaignActions>
	implements OnInit, OnDestroy {
	@select(["app", "forms", "campaignForm"])
	public campaign$: Observable<Campaign>;

	@select(["app", "forms", "campaignFormData", "rulesets"])
	public rulesets$: Observable<Ruleset[]>;

	public name: FormControl = new FormControl("", Validators.required);
	public description: FormControl = new FormControl("", Validators.required);
	public rulesetID: FormControl = new FormControl("", Validators.required);
	public formGroup: FormGroup = new FormGroup({
		id: new FormControl(""),
		name: this.name,
		description: this.description,
		ruleset: new FormGroup({
			id: this.rulesetID,
			name: new FormControl("")
		})
	});

	protected formSelector: Array<string> = ["app", "forms", "campaignForm"];

	constructor(
		protected location: Location,
		protected service: CampaignService,
		protected snackBarService: SnackBarService,
		protected store: NgRedux<IAppState>,
		protected actions: CampaignActions,
		keyboardService: KeyboardService
	) {
		super(
			store,
			actions,
			location,
			service,
			snackBarService,
			keyboardService
		);
	}

	public ngOnInit() {
		super.onInit();
	}

	public ngOnDestroy() {
		super.onDestroy();
	}

	protected fixWeirdities(item: Campaign): Campaign {
		return item;
	}
	protected afterNew(item: Campaign): Campaign {
		return item;
	}
	protected getInstance(): Campaign {
		return this.store.getState().app.forms.campaignForm;
	}
	protected isEqual(a: Campaign, b: Campaign): boolean {
		return Campaign.isEqual(a, b);
	}
	protected getParentId(): number {
		return null;
	}
	protected syncFrom() {}
	protected syncTo() {}
}
