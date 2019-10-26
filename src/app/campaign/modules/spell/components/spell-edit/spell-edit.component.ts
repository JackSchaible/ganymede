import {
	Component,
	OnInit,
	OnDestroy,
	ViewChild,
	ElementRef,
	AfterViewInit
} from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Spell } from "src/app/campaign/modules/spell/models/spell";
import { NgRedux, select } from "@angular-redux/store";
import { SpellActions } from "../../store/actions";
import { IAppState } from "src/app/models/core/iAppState";
import { SpellRange } from "src/app/campaign/modules/spell/models/spellRange";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { map } from "rxjs/operators";
import { SpellFormData } from "src/app/models/core/app/forms/formData/spellFormData";
import * as _ from "lodash";
import { Location } from "@angular/common";
import { SpellService } from "../../spell.service";
import { WordService } from "src/app/services/word.service";
import { SpellFormValidators } from "../../spell.validators";
import { SpellSchool } from "../../models/spellSchool";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { MatRadioChange } from "@angular/material/radio";
import { CastingTime } from "../../models/castingTime";
import { SnackBarService } from "src/app/services/snackbar.service";
import FormBase from "src/app/common/formBase/formBase";
import { KeyboardService } from "src/app/services/keyboard.service";
import { MatStepper } from "@angular/material/stepper";
import { Key } from "ts-key-enum";

@Component({
	selector: "gm-spell-edit",
	templateUrl: "./spell-edit.component.html",
	styleUrls: ["./spell-edit.component.scss"]
})
export class SpellEditComponent extends FormBase<Spell, SpellActions>
	implements OnInit, AfterViewInit, OnDestroy {
	constructor(
		protected store: NgRedux<IAppState>,
		protected actions: SpellActions,
		protected location: Location,
		protected service: SpellService,
		protected snackBarService: SnackBarService,
		private words: WordService,
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

	@select(["app", "forms", "spellForm"])
	public spell$: Observable<Spell>;

	@select(["app", "forms", "spellFormData"])
	public formData$: Observable<SpellFormData>;
	public schools$: Observable<SpellSchool[]>;

	@ViewChild("steppy", { static: true }) stepper: MatStepper;
	@ViewChild("name", { static: false }) nameEl: ElementRef;

	public showCastingTime: boolean;
	public showReaction: boolean;
	public showRange: boolean;
	public showShape: boolean;
	public showMaterials: boolean;
	public showDuration: boolean;
	public conHasExtraSpacing: boolean;
	public showUntil: boolean;

	// #region FormDef
	public name: FormControl = new FormControl("", Validators.required);
	public level: FormControl = new FormControl("", [
		Validators.required,
		Validators.min(0),
		Validators.max(9)
	]);
	public schoolId: FormControl = new FormControl("", Validators.required);
	public castingTimeAmount: FormControl = new FormControl("");
	public castingTimeUnit: FormControl = new FormControl("");
	public castingTimeReaction: FormControl = new FormControl("");
	public castingTimeType: FormControl = new FormControl(
		"",
		Validators.required
	);
	public castingTime: FormGroup = new FormGroup(
		{
			type: this.castingTimeType,
			amount: this.castingTimeAmount,
			unit: this.castingTimeUnit,
			reactionCondition: this.castingTimeReaction
		},
		[SpellFormValidators.validateCastingTime(this.words)]
	);
	public rangeAmount: FormControl = new FormControl("");
	public rangeUnit: FormControl = new FormControl("");
	public rangeType: FormControl = new FormControl("");
	public rangeShape: FormControl = new FormControl("");
	public range: FormGroup = new FormGroup(
		{
			amount: this.rangeAmount,
			unit: this.rangeUnit,
			type: this.rangeType,
			shape: this.rangeShape
		},
		SpellFormValidators.validateRange(this.words)
	);
	public componentsVerbal: FormControl = new FormControl("");
	public componentsSomatic: FormControl = new FormControl("");
	public componentsMaterial: FormArray = new FormArray([]);
	public components: FormGroup = new FormGroup(
		{
			verbal: this.componentsVerbal,
			somatic: this.componentsSomatic,
			material: this.componentsMaterial
		},
		SpellFormValidators.validateComponents(this.words)
	);
	public durationAmount: FormControl = new FormControl("");
	public durationUnit: FormControl = new FormControl("");
	public durationConcentration: FormControl = new FormControl("");
	public durationUpTo: FormControl = new FormControl("");
	public durationType: FormControl = new FormControl("");
	public durationUntilDispelled: FormControl = new FormControl("");
	public durationUntilTriggered: FormControl = new FormControl("");
	public duration: FormGroup = new FormGroup(
		{
			amount: this.durationAmount,
			unit: this.durationUnit,
			concentration: this.durationConcentration,
			upTo: this.durationUpTo,
			type: this.durationType,
			untilDispelled: this.durationUntilDispelled,
			untilTriggered: this.durationUntilTriggered
		},
		SpellFormValidators.validateDuration(this.words)
	);
	public description: FormControl = new FormControl("", Validators.required);
	public formGroup: FormGroup = new FormGroup({
		id: new FormControl(""),
		campaignID: new FormControl(""),
		name: this.name,
		level: this.level,
		spellSchool: new FormGroup({
			id: this.schoolId,
			name: new FormControl(""),
			description: new FormControl("")
		}),
		castingTime: this.castingTime,
		spellRange: this.range,
		spellComponents: this.components,
		spellDuration: this.duration,
		description: this.description,
		atHigherLevels: new FormControl("")
	});
	// #endregion

	protected formSelector = ["app", "forms", "spellForm"];

	public ngOnInit() {
		this.onInit();

		this.schools$ = this.formData$.pipe(
			map((value: SpellFormData): SpellSchool[] => {
				return value.schools.sort((a: SpellSchool, b: SpellSchool) => {
					if (a.name < b.name) return -1;
					if (a.name > b.name) return 1;
					return 0;
				});
			})
		);

		this.keySubscriptions.push(
			{
				key: "1",
				modifierKeys: [Key.Control],
				callbackFn: () => (this.stepper.selectedIndex = 0)
			},
			{
				key: "2",
				modifierKeys: [Key.Control],
				callbackFn: () => (this.stepper.selectedIndex = 1)
			},
			{
				key: "3",
				modifierKeys: [Key.Control],
				callbackFn: () => (this.stepper.selectedIndex = 2)
			},
			{
				key: "4",
				modifierKeys: [Key.Control],
				callbackFn: () => (this.stepper.selectedIndex = 3)
			},
			{
				key: "5",
				modifierKeys: [Key.Control],
				callbackFn: () => (this.stepper.selectedIndex = 4)
			},
			{
				key: "6",
				modifierKeys: [Key.Control],
				callbackFn: () => (this.stepper.selectedIndex = 5)
			},
			{
				key: "7",
				modifierKeys: [Key.Control],
				callbackFn: () => (this.stepper.selectedIndex = 6)
			},
			{
				key: "8",
				modifierKeys: [Key.Control],
				callbackFn: () => (this.stepper.selectedIndex = 7)
			}
		);
	}

	public ngAfterViewInit() {
		setTimeout(() => this.nameEl.nativeElement.focus(), 500);
	}

	public ngOnDestroy() {
		this.onDestroy();
	}

	protected syncFrom(spell: Spell) {
		this.syncFromCastingTime(spell.castingTime);
		this.syncFromRange(spell.spellRange);
		if (spell.spellComponents)
			this.syncFromMaterial(spell.spellComponents.material);
		if (spell.spellDuration) this.setRangeType(spell.spellDuration.type);
	}
	private syncFromCastingTime(time: CastingTime) {
		if (!time) return;
		this.showReaction = this.isReaction(time.type);
		this.showCastingTime = this.isTime(time.type);
	}
	private syncFromRange(spellRange: SpellRange) {
		if (!spellRange) return;
		this.showRange = this.isRangeRanged(spellRange.type);
	}
	private syncFromMaterial(materials: string[]) {
		if (!materials) return;
		this.showMaterials = (materials && materials.length > 0) as boolean;

		if (!materials || this.componentsMaterial.length > 0) return;

		// Dynamically create the form controls for material components
		for (let i = 0; i < materials.length; i++) {
			this.componentsMaterial.push(
				new FormGroup({
					name: new FormControl(materials[i])
				})
			);
		}
	}

	protected syncTo(spell: Spell) {}

	// Fix oddities with the form
	protected fixWeirdities(spellIn: any): Spell {
		const spell = _.cloneDeep(spellIn);
		if (
			spell.spellComponents &&
			spell.spellComponents.material &&
			spell.spellComponents.material.length > 0
		)
			for (let i = 0; i < spell.spellComponents.material.length; i++)
				if (
					spell.spellComponents.material[i] &&
					typeof spell.spellComponents.material[i] !== "string"
				)
					spell.spellComponents.material[i] =
						spell.spellComponents.material[i].name;

		return spell;
	}

	protected isEqual(a: Spell, b: Spell): boolean {
		return Spell.isEqual(a, b);
	}

	public castingTimeChanged(event: MatRadioChange) {
		this.showReaction = this.isReaction(event.value);
		this.showCastingTime = this.isTime(event.value);
	}
	private isReaction(value: string): boolean {
		return value === "Reaction";
	}
	private isTime(value: string): boolean {
		return value === "Time";
	}

	public rangeChanged(event: MatRadioChange) {
		this.showRange = this.isRangeRanged(event.value);
	}
	private isRangeRanged(value: string): boolean {
		return value === "Ranged" || value === "Self";
	}
	private setRangeType(type: string) {
		switch (type) {
			case "Duration":
				this.showDuration = true;
				this.showUntil = false;
				break;

			case "Until":
				this.showDuration = false;
				this.showUntil = true;
				break;

			default:
				this.showDuration = false;
				this.showUntil = false;
				break;
		}
	}

	public materialChanged(event: MatCheckboxChange) {
		this.showMaterials = !!event.checked;

		if (this.showMaterials && this.componentsMaterial.length === 0)
			this.addMaterial();
	}
	public addMaterial(): void {
		this.componentsMaterial.push(
			new FormGroup({
				name: new FormControl("", Validators.required)
			})
		);
	}
	public removeMaterial(index: number): void {
		this.componentsMaterial.removeAt(index);
	}

	public durationChanged(event: MatRadioChange) {
		this.setRangeType(event.value);
		this.conHasExtraSpacing = !!this.durationConcentration.value;
	}

	protected getInstance(): Spell {
		return this.store.getState().app.forms.spellForm;
	}

	protected afterNew(spell: Spell): Spell {
		spell.campaignID = this.store.getState().app.campaign.id;
		return spell;
	}
}
