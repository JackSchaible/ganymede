import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { Spell } from "src/app/campaign/modules/spell/models/spell";
import { NgRedux, select } from "@angular-redux/store";
import { SpellActions } from "../../store/actions";
import { IAppState } from "src/app/models/core/iAppState";
import { SpellRange } from "src/app/campaign/modules/spell/models/spellRange";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { SpellFormData } from "src/app/models/core/app/forms/formData/spellFormData";
import * as _ from "lodash";
import { Location } from "@angular/common";
import { SpellService } from "../../spell.service";
import { ApiResponse } from "src/app/services/http/apiResponse";
import { MatSnackBar } from "@angular/material/snack-bar";
import ApiCodes from "src/app/services/http/apiCodes";
import { WordService } from "src/app/services/word.service";
import { SpellFormValidators } from "../../spell.validators";
import { SpellSchool } from "../../models/spellSchool";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { MatRadioChange } from "@angular/material/radio";
import { CastingTime } from "../../models/castingTime";
import { SpellComponents } from "../../models/spellComponents";

@Component({
	selector: "gm-spell-edit",
	templateUrl: "./spell-edit.component.html",
	styleUrls: ["./spell-edit.component.scss"]
})
export class SpellEditComponent implements OnInit, OnDestroy {
	@select(["app", "forms", "spellForm"])
	public spell$: Observable<Spell>;

	@select(["app", "forms", "spellFormData"])
	public formData$: Observable<SpellFormData>;
	public schools$: Observable<SpellSchool[]>;

	private formStoreSubscription: Subscription;
	private formValueChangesSubscription: Subscription;

	public hasSubmitted: boolean;
	public showCastingTime: boolean;
	public showReaction: boolean;
	public showRange: boolean;
	public showShape: boolean;
	public showMaterials: boolean;
	public noComponents: boolean;
	public showDuration: boolean;
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
		[SpellFormValidators.validateRange(this.words)]
	);
	public componentsVerbal: FormControl = new FormControl("");
	public componentsSomatic: FormControl = new FormControl("");
	public componentsMaterial: FormArray = new FormArray([]);
	public components: FormGroup = new FormGroup({
		verbal: this.componentsVerbal,
		somatic: this.componentsSomatic,
		material: this.componentsMaterial
	});
	public durationAmount: FormControl = new FormControl("");
	public durationUnit: FormControl = new FormControl("");
	public durationConcentration: FormControl = new FormControl("");
	public durationUpTo: FormControl = new FormControl("");
	public durationType: FormControl = new FormControl("");
	public durationUntilDispelled: FormControl = new FormControl("");
	public durationUntilTriggered: FormControl = new FormControl("");
	public duration: FormGroup = new FormGroup({
		amount: this.durationAmount,
		unit: this.durationUnit,
		concentration: this.durationConcentration,
		upTo: this.durationUpTo,
		type: this.durationType,
		untilDispelled: this.durationUntilDispelled,
		untilTriggered: this.durationUntilTriggered
	});
	public description: FormControl = new FormControl("", Validators.required);
	public spellFormGroup: FormGroup = new FormGroup({
		name: this.name,
		level: this.level,
		spellSchool: new FormGroup({
			id: this.schoolId,
			name: new FormControl(""),
			description: new FormControl("")
		}),
		castingTime: this.castingTime,
		range: this.range,
		components: this.components,
		duration: this.duration,
		description: this.description,
		atHigherLevels: new FormControl("")
	});
	// #endregion

	public processing: boolean;
	public isNew: boolean;

	constructor(
		private store: NgRedux<IAppState>,
		private actions: SpellActions,
		private location: Location,
		private service: SpellService,
		private snackBar: MatSnackBar,
		private words: WordService
	) {}

	ngOnInit() {
		this.syncFromStore();
		this.syncToStore();

		this.schools$ = this.formData$.pipe(
			map((value: SpellFormData): SpellSchool[] => {
				return value.schools.sort((a: SpellSchool, b: SpellSchool) => {
					if (a.name < b.name) return -1;
					if (a.name > b.name) return 1;
					return 0;
				});
			})
		);
	}
	private syncFromStore() {
		if (this.formStoreSubscription !== undefined) return;

		this.formStoreSubscription = this.store
			.select(["app", "forms", "spellForm"])
			.subscribe((spell: Spell) => {
				this.spellFormGroup.patchValue(spell);

				this.syncFromCastingTime(spell.castingTime);
				this.syncFromRange(spell.spellRange);
				if (spell.spellComponents)
					this.syncFromMaterial(spell.spellComponents.material);
				if (spell.spellDuration)
					this.setRangeType(spell.spellDuration.type);
			});
	}
	private syncFromCastingTime(time: CastingTime) {
		if (!time) return;
		this.showReaction = this.isReaction(time.type);
		this.showCastingTime = this.isTime(time.type);
	}
	private syncFromRange(spellRange: SpellRange) {
		if (!spellRange) return;
		this.showRange = this.isRangeRanged(spellRange.type);
		if (spellRange.type === "Self") this.ifRangeIsSelf();
		else this.ifRangeIsNotSelf();
	}
	private syncFromMaterial(materials: string[]) {
		if (!materials) return;
		this.showMaterials = materials && materials.length > 0;
		const array: FormArray = (this.spellFormGroup.get(
			"components"
		) as FormGroup).get("material") as FormArray;

		if (!materials || array.length > 0) return;

		// Dynamically create the form controls for material components
		for (let i = 0; i < materials.length; i++) {
			array.push(
				new FormGroup({
					name: new FormControl(materials[i])
				})
			);
		}
	}

	private syncToStore() {
		if (this.formValueChangesSubscription !== undefined) return;

		this.formValueChangesSubscription = this.spellFormGroup.valueChanges
			.pipe(
				debounceTime(250),
				distinctUntilChanged((a: Spell, b: Spell): boolean => {
					a = this.fixWeirdities(a);
					b = this.fixWeirdities(b);
					return Spell.isEqual(a, b);
				})
			)
			.subscribe((spell: Spell) => {
				spell = this.fixWeirdities(spell);
				this.validateComponents();
				this.store.dispatch(this.actions.spellEditFormChange(spell));
			});
	}
	// Fix oddities with the form
	private fixWeirdities(spellIn: any): Spell {
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

	ngOnDestroy(): void {
		if (this.formStoreSubscription)
			this.formStoreSubscription.unsubscribe();

		if (this.formStoreSubscription)
			this.formValueChangesSubscription.unsubscribe();
	}

	private openSnackbar(icon: string, message: string): void {}

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
		if (event.value === "Self") this.ifRangeIsSelf();
		else this.ifRangeIsNotSelf();
	}
	private isRangeRanged(value: string): boolean {
		return value === "Ranged" || value === "Self";
	}
	private ifRangeIsSelf(): void {
		this.showShape = true;
		const control = (this.spellFormGroup.controls["range"] as FormGroup)
			.controls["unit"];
		if (this.words.isNullOrWhitespace(control.value))
			control.patchValue("foot");
	}
	private ifRangeIsNotSelf(): void {
		this.showShape = false;
		const control = (this.spellFormGroup.controls["range"] as FormGroup)
			.controls["unit"];
		if (this.words.isNullOrWhitespace(control.value))
			control.patchValue("feet");
	}

	public materialChanged(event: MatCheckboxChange) {
		this.showMaterials = event.checked;

		if (
			this.showMaterials &&
			((this.spellFormGroup.get("spellComponents") as FormGroup).get(
				"material"
			) as FormArray).length === 0
		)
			this.addMaterial();
	}
	public addMaterial(): void {
		((this.spellFormGroup.get("spellComponents") as FormGroup).get(
			"material"
		) as FormArray).push(
			new FormGroup({
				name: new FormControl("", Validators.required)
			})
		);
	}
	public removeMaterial(index: number): void {
		((this.spellFormGroup.get("spellComponents") as FormGroup).get(
			"material"
		) as FormArray).removeAt(index);
	}
	private validateComponents(): boolean {
		let valid = true;
		this.noComponents = false;
		const materials = this.componentsMaterial.controls;

		if (materials.length > 0)
			for (let i = 0; i < materials.length; i++) {
				if (this.words.isNullOrWhitespace(materials[i].value.name)) {
					materials[i].setErrors({ required: true });
					valid = false;
				}
			}
		else {
			if (
				!this.components.controls["verbal"].value &&
				!this.components.controls["somatic"].value
			) {
				this.noComponents = true;
				valid = false;
			}
		}

		return valid;
	}

	public durationChanged(event: MatRadioChange) {
		this.setRangeType(event.value);
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

	public cancel(): void {
		this.actions.spellEditFormChange(null);
		this.location.back();
	}

	public save(): void {
		this.hasSubmitted = true;
		const spell = this.store.getState().app.forms.spellForm;

		// TODO: Call server backend
		if (this.validateComponents() && this.spellFormGroup.valid) {
			this.processing = true;

			this.service.save(spell).subscribe(
				(response: ApiResponse) => {
					this.processing = false;
					if (response) {
						if (response.statusCode === ApiCodes.Ok) {
							this.openSnackbar(
								"check-square",
								`${spell.name} was successfully saved!`
							);

							const wasNew = this.isNew;

							if (this.isNew) {
								this.isNew = false;
								spell.id = response.insertedID;
							}

							this.store.dispatch(
								this.actions.spellSaved(spell, wasNew)
							);
						} else
							this.openSnackbar(
								"exclamation-triangle",
								`An error occurred while saving ${spell.name}!`
							);
					} else
						this.openSnackbar(
							"exclamation-triangle",
							`An error occurred while saving ${spell.name}!`
						);
				},
				() => {
					this.processing = false;
					this.openSnackbar(
						"exclamation-triangle",
						`An error occurred while saving ${spell.name}!`
					);
				}
			);
		}
	}
}
