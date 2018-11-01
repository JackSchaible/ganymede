import { Component, OnInit, Input, ViewChild } from "@angular/core";
import Spell from "src/app/common/models/monster/traits/spells/spell";
import { SpellSchool } from "src/app/common/models/monster/classes/SpellData";
import { PlayerClass } from "src/app/common/models/values";
import SpellComponents from "src/app/common/models/monster/traits/spells/spellComponents";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import {
	MatChipInputEvent,
	MatAutocomplete,
	MatAutocompleteSelectedEvent
} from "@angular/material";
import { SpellCardComponent } from "src/app/common/spell-card/spell-card.component";

@Component({
	selector: "gm-spell-edit",
	templateUrl: "./spell-edit.component.html",
	styleUrls: ["./spell-edit.component.scss"]
})
export class SpellEditComponent implements OnInit {
	@Input()
	public spell: Spell;

	@ViewChild("card")
	spellCard: SpellCardComponent;

	private formGroup: FormGroup;
	private form = {
		spellName: [],
		spellClasses: []
	};

	private isNew: boolean;

	private selectedClasses: string[];
	private separatorKeysCodes: number[] = [ENTER, COMMA];
	private spellClassesInput: FormControl = new FormControl();
	private filteredClasses: Observable<string[]>;
	private allClasses: string[];
	@ViewChild("spellsAC")
	matAutocomplete: MatAutocomplete;

	constructor(protected formBuilder: FormBuilder) {
		if (!this.spell) {
			this.isNew = true;
			this.spell = new Spell(
				"Spell Name",
				0,
				SpellSchool.Abjuration,
				[PlayerClass.Bard],
				"1 Round",
				"Touch",
				new SpellComponents(true, true, null),
				"Instantaneous",
				["Spell description goes here"],
				null
			);
		}

		this.allClasses = [];
		this.selectedClasses = [];

		let keys = Object.keys(PlayerClass);
		keys = keys.splice(keys.length / 2, keys.length);

		for (let i = 0; i < keys.length; i++) {
			var text = keys[i];
			this.allClasses.push(text);

			if (this.spell.Classes.indexOf(PlayerClass[text]) >= 0)
				this.selectedClasses.push(text);
		}

		this.filteredClasses = this.spellClassesInput.valueChanges.pipe(
			startWith(null),
			map(
				(pc: string | null) => (pc ? this._filter(pc) : this.allClasses.slice())
			)
		);
	}

	ngOnInit() {
		this.formGroup = this.formBuilder.group(this.form);
		this.formGroup.valueChanges.subscribe(form => this.formChange(form));
		this.spellCard.onChange();
	}

	formChange(form: any): void {
		this.spellCard.onChange();
	}

	private add(event: MatChipInputEvent): void {
		if (!this.matAutocomplete.isOpen) {
			const value = event.value;

			if (
				(value || "").trim() &&
				this.spell.Classes.indexOf(PlayerClass[value.trim()]) === -1
			) {
				this.selectedClasses.push(value.trim());
				this.spell.Classes.push(PlayerClass[value.trim()]);
			}

			this.spellClassesInput.setValue(null);
			this.spellCard.onChange();
		}
	}

	private remove(pc: string): void {
		let index = this.selectedClasses.indexOf(pc);
		if (index >= 0) this.selectedClasses.splice(index, 1);

		index = this.spell.Classes.indexOf(PlayerClass[pc]);
		if (index >= 0) this.spell.Classes.splice(index, 1);

		this.spellCard.onChange();
	}

	private spellSelected(event: MatAutocompleteSelectedEvent): void {
		if (this.spell.Classes.indexOf(PlayerClass[event.option.viewValue]) !== -1)
			return;

		this.selectedClasses.push(event.option.viewValue);
		this.spell.Classes.push(PlayerClass[event.option.viewValue]);
		this.spellClassesInput.setValue(null);
		this.spellCard.onChange();
	}

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();

		return this.allClasses.filter(
			fruit => fruit.toLowerCase().indexOf(filterValue) === 0
		);
	}
}
