import { Component, OnInit, Input } from "@angular/core";
import Spell from "src/app/common/models/monster/traits/spells/spell";
import { SpellSchool } from "src/app/common/models/monster/classes/SpellData";
import { PlayerClass } from "src/app/common/models/values";
import SpellComponents from "src/app/common/models/monster/traits/spells/spellComponents";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";

@Component({
	selector: "gm-spell-edit",
	templateUrl: "./spell-edit.component.html",
	styleUrls: ["./spell-edit.component.scss"]
})
export class SpellEditComponent implements OnInit {
	@Input()
	public spell: Spell;

	private formGroup: FormGroup;
	private form = {
		spellName: [],
		spellClasses: new FormControl()
	};

	private isNew: boolean;

	private allClasses: any[];
	private spellClasses = new FormControl();
	private currentClasses: number[];

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
		this.allClasses = [
			{ value: 1, text: "Barbarian" },
			{ value: 2, text: "Bard" },
			{ value: 3, text: "Cleric" },
			{ value: 4, text: "Druid" },
			{ value: 5, text: "Fighter" },
			{ value: 6, text: "Monk" },
			{ value: 7, text: "Paladin" },
			{ value: 8, text: "Ranger" },
			{ value: 9, text: "Rogue" },
			{ value: 10, text: "Sorcerer" },
			{ value: 11, text: "Warlock" },
			{ value: 12, text: "Wizard" }
		];

		this.currentClasses = [];

		for (let i = 0; i < this.spell.Classes.length; i++)
			this.currentClasses.push(this.spell.Classes[i]);
	}

	ngOnInit() {
		this.formGroup = this.formBuilder.group(this.form);
		this.formGroup.valueChanges.subscribe(form => this.formChange(form));
	}

	formChange(form: any): void {
		console.log(this.spellClasses.value);
	}
}
