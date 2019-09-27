import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { Spell } from "src/app/models/core/spells/spell";
import { NgRedux, select } from "@angular-redux/store";
import { SpellActions } from "../store/actions";
import { IAppState } from "src/app/models/core/iAppState";
import { SpellRange } from "src/app/models/core/spells/spellRange";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { SpellFormData } from "src/app/models/core/app/forms/formData/spellFormData";

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

	private formStoreSubscription: Subscription;
	private formValueChangesSubscription: Subscription;

	public spellSchoolId: number;
	public rangeType: string;
	public hasMaterial: boolean;

	public spellFormGroup: FormGroup = new FormGroup({
		name: new FormControl(""),
		level: new FormControl("", {}),
		castingTime: new FormGroup({
			amount: new FormControl(""),
			unit: new FormControl("")
		}),
		spellRange: new FormGroup({
			amount: new FormControl(""),
			unit: new FormControl(""),
			type: new FormControl(""),
			shape: new FormControl("")
		}),
		spellComponents: new FormGroup({
			verbal: new FormControl(""),
			somatic: new FormControl(""),
			material: new FormControl(""),
			materials: new FormArray([])
		}),
		spellDuration: new FormGroup({
			amount: new FormControl(""),
			unit: new FormControl(""),
			concentration: new FormControl(""),
			special: new FormControl(""),
			upTo: new FormControl(""),
			instantaneous: new FormControl("")
		}),
		description: new FormControl(""),
		atHigherLevels: new FormControl("")
	});

	constructor(
		private store: NgRedux<IAppState>,
		private actions: SpellActions
	) {}

	ngOnInit() {
		this.syncFromStore();
		this.syncToStore();
	}

	ngOnDestroy(): void {
		if (this.formStoreSubscription)
			this.formStoreSubscription.unsubscribe();

		if (this.formStoreSubscription)
			this.formValueChangesSubscription.unsubscribe();
	}

	private syncFromStore() {
		if (this.formStoreSubscription !== undefined) return;

		this.formStoreSubscription = this.store
			.select(["app", "forms", "spellForm"])
			.subscribe((spell: Spell) => {
				this.spellFormGroup.patchValue(spell);

				if (spell.spellSchool)
					this.spellSchoolId = spell.spellSchool.id;

				if (spell.spellRange) {
					const rangeTypeValue = this.getRangeType(spell.spellRange);
					(<FormGroup>(
						this.spellFormGroup.controls["spellRange"]
					)).controls["type"].patchValue(rangeTypeValue);
					this.rangeType = rangeTypeValue;
				}

				if (spell.spellComponents) {
					this.hasMaterial =
						spell.spellComponents.material &&
						spell.spellComponents.material.length > 0;

					// Dynamically create the form controls for material components
					if (this.hasMaterial)
						this.getMaterialComponents(
							spell.spellComponents.material
						);
				}
			});
	}
	private syncToStore() {
		if (this.formValueChangesSubscription !== undefined) return;

		this.formValueChangesSubscription = this.spellFormGroup.valueChanges
			.pipe(
				debounceTime(250),
				distinctUntilChanged((a: Spell, b: Spell) =>
					Spell.isEqual(a, b)
				)
			)
			.subscribe((spell: Spell) => {
				const rangeTypeValue = (<FormGroup>(
					this.spellFormGroup.controls["spellRange"]
				)).controls["type"].value;
				spell.spellRange = this.setRangeType(
					rangeTypeValue,
					spell.spellRange
				);
				this.rangeType = rangeTypeValue;

				this.hasMaterial = !!spell.spellComponents.material;
				spell.spellComponents.material = this.setMaterialComponents();

				// TODO: Reenable once all form fields are hooked up, causes errors in the preview component
				// this.store.dispatch(this.actions.spellEditFormChange(spell));
			});
	}
	private getRangeType(range: SpellRange): string {
		let rangeType: string;

		if (range.self) rangeType = "self";
		else if (range.touch) rangeType = "touch";
		else rangeType = "ranged";

		return rangeType;
	}
	private setRangeType(type: string, range: SpellRange): SpellRange {
		switch (type) {
			case "ranged":
				range.self = false;
				range.touch = false;
				break;

			case "touch":
				range.touch = true;
				range.self = false;
				range.amount = 0;
				break;

			case "self":
				range.self = true;
				range.touch = false;
				range.amount = 0;
				break;
		}

		return range;
	}
	private getMaterialComponents(materials: string[]): void {
		for (let i = 0; i < materials.length; i++)
			((this.spellFormGroup.get("spellComponents") as FormGroup).get(
				"materials"
			) as FormArray).push(
				new FormGroup({
					name: new FormControl(materials[i])
				})
			);
	}
	private setMaterialComponents(): string[] {
		const materials = [];

		const controls = ((this.spellFormGroup.get(
			"spellComponents"
		) as FormGroup).get("materials") as FormArray).controls;

		for (let i = 0; i < controls.length; i++)
			materials.push(controls[i].value);

		return materials;
	}

	public addMaterial(): void {
		((this.spellFormGroup.get("spellComponents") as FormGroup).get(
			"materials"
		) as FormArray).push(
			new FormGroup({
				name: new FormControl("")
			})
		);
	}

	public removeMaterial(index: number): void {
		((this.spellFormGroup.get("spellComponents") as FormGroup).get(
			"materials"
		) as FormArray).removeAt(index);
	}

	public cancel(): void {}

	public save(): void {}
}
