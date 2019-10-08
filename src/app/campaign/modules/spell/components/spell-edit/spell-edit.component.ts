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
	public showRange: boolean;
	public showShape: boolean;
	public showMaterials: boolean;
	public showDuration: boolean;
	public showUntil: boolean;

	public spellFormGroup: FormGroup = new FormGroup({
		name: new FormControl("", Validators.required),
		level: new FormControl("", [
			Validators.required,
			Validators.min(0),
			Validators.max(9)
		]),
		spellSchool: new FormGroup({
			id: new FormControl("", Validators.required),
			name: new FormControl(""),
			description: new FormControl("")
		}),
		castingTime: new FormGroup(
			{
				amount: new FormControl("", [
					Validators.required,
					Validators.min(1)
				]),
				unit: new FormControl("", [Validators.required]),
				reactionCondition: new FormControl("")
			},
			[SpellFormValidators.validateCastingTime(this.words)]
		),
		spellRange: new FormGroup(
			{
				amount: new FormControl(""),
				unit: new FormControl(""),
				type: new FormControl(""),
				shape: new FormControl("")
			},
			[SpellFormValidators.validateRange(this.words)]
		),
		spellComponents: new FormGroup(
			{
				verbal: new FormControl(""),
				somatic: new FormControl(""),
				material: new FormArray([])
			},
			SpellFormValidators.validateComponents(this.words)
		),
		spellDuration: new FormGroup({
			amount: new FormControl(""),
			unit: new FormControl(""),
			concentration: new FormControl(""),
			upTo: new FormControl(""),
			type: new FormControl(""),
			untilDispelled: new FormControl(""),
			untilTriggered: new FormControl("")
		}),
		description: new FormControl("", Validators.required),
		atHigherLevels: new FormControl("")
	});
	get name() {
		return this.spellFormGroup.get("name");
	}
	get level() {
		return this.spellFormGroup.get("level");
	}
	get school() {
		return (this.spellFormGroup.get("spellSchool") as FormGroup).get("id");
	}

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
				console.log("sync from");
				this.spellFormGroup.patchValue(spell);

				this.syncFromRange(spell.spellRange);
				this.syncFromMaterial(spell.spellComponents.material);
				this.setRangeType(spell.spellDuration.type);
			});
	}
	private syncFromRange(spellRange: SpellRange): void {
		this.showRange = this.isRangeRanged(spellRange.type);
		if (spellRange.type === "Self") this.ifRangeIsSelf();
		else this.ifRangeIsNotSelf();
	}
	private syncFromMaterial(materials: string[]) {
		this.showMaterials = materials && materials.length > 0;
		const array: FormArray = (this.spellFormGroup.get(
			"spellComponents"
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
				console.log("sync to");
				spell = this.fixWeirdities(spell);
				this.store.dispatch(this.actions.spellEditFormChange(spell));
			});
	}
	// Fix oddities with the form
	private fixWeirdities(spellIn: any): Spell {
		const spell = _.cloneDeep(spellIn);
		if (
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
		(this.spellFormGroup.controls["spellRange"] as FormGroup).controls[
			"unit"
		].patchValue("foot");
	}
	private ifRangeIsNotSelf(): void {
		this.showShape = false;
		(this.spellFormGroup.controls["spellRange"] as FormGroup).controls[
			"unit"
		].patchValue("feet");
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
		if (this.spellFormGroup.valid) {
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
