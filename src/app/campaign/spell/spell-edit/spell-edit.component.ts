import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { Spell } from "src/app/models/core/spells/spell";
import { NgRedux, select } from "@angular-redux/store";
import { SpellSchool } from "src/app/models/core/spells/spellSchool";
import { MatSelectChange } from "@angular/material/select";
import { SpellActions } from "../store/actions";
import { IAppState } from "src/app/models/core/iAppState";
import { MatRadioChange } from "@angular/material/radio";
import { SpellRange } from "src/app/models/core/spells/spellRange";
import { FormGroup, FormControl } from "@angular/forms";
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

	public spellFormGroup: FormGroup = new FormGroup({
		name: new FormControl(""),
		level: new FormControl("", {}),
		castingTime: new FormGroup({
			amount: new FormControl(""),
			unit: new FormControl("")
		})
	});

	private schools: SpellSchool[];

	constructor(
		private store: NgRedux<IAppState>,
		private actions: SpellActions
	) {}

	ngOnInit() {
		this.syncFromStore();
		console.log(this.formData$);
	}

	ngOnDestroy(): void {
		this.formStoreSubscription.unsubscribe();
		this.formValueChangesSubscription.unsubscribe();
	}

	private syncFromStore() {
		if (this.formStoreSubscription !== undefined) return;

		this.formStoreSubscription = this.store
			.select(["app", "forms", "spellForm"])
			.subscribe((spell: Spell) => {
				console.log("store subscribe");
				this.spellFormGroup.patchValue(spell);

				if (spell.spellSchool)
					this.spellSchoolId = spell.spellSchool.id;

				if (spell.spellRange) this.setRangeType(spell.spellRange);

				console.log(spell);
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
			.subscribe(values => {
				console.log(values);
				this.store.dispatch(this.actions.spellEditFormChange(values));
			});
	}

	public schoolChanged(event: MatSelectChange): void {
		const school = this.schools.find((value: SpellSchool) => {
			return value.id === event.value;
		});
		this.store.dispatch(this.actions.spellSchoolChanged(school));
	}

	public rangeTypeChanged(event: MatRadioChange): void {
		this.store.dispatch(this.actions.spellRangeTypeChanged(event.value));
	}

	private setRangeType(range: SpellRange): void {
		if (range.self) this.rangeType = "self";
		else if (range.touch) this.rangeType = "touch";
		else this.rangeType = "ranged";
	}
}
