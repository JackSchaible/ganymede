import {
	Component,
	OnInit,
	Input,
	ViewChild,
	AfterViewInit
} from "@angular/core";
import Spell from "src/app/common/models/monster/traits/spells/spell";
import { PlayerClass } from "src/app/common/models/values";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatAutocompleteSelectedEvent } from "@angular/material";
import { SpellCardComponent } from "src/app/common/spell-card/spell-card.component";
import SpellData, {
	SpellSchool
} from "src/app/common/models/monster/classes/SpellData";
import { SpellService } from "src/app/services/spell.service";

@Component({
	selector: "gm-spell-edit",
	templateUrl: "./spell-edit.component.html"
})
export class SpellEditComponent implements OnInit, AfterViewInit {
	@Input()
	public spell: Spell;

	@Input()
	public isModal: boolean;

	@ViewChild("card")
	spellCard: SpellCardComponent;

	private formGroup: FormGroup;
	private form = {
		name: [],
		classes: [],
		school: [],
		timeAmount: [],
		rangeAmount: [],
		materialComponent: [],
		description: [],
		atHigherLevels: []
	};

	private isNew: boolean;

	private selectedClasses: string[];
	private separatorKeysCodes: number[] = [ENTER, COMMA];

	private classes: string[];
	private schools: SpellSchool[];
	private castingTimes: string[] = SpellData.CastingTimes;
	private ranges: string[] = SpellData.Ranges;
	private durations: string[] = SpellData.Durations;

	private processing: boolean;
	private processingMessage: string;
	private errorMessage: string;
	private knownErrors: any = {
		API_ERR_UNK: "An unknown error has occurred. Please try again later."
	};

	constructor(
		protected formBuilder: FormBuilder,
		private spellService: SpellService
	) {
		if (!this.spell) this.spell = Spell.MakeDefault();

		this.classes = [];
		this.selectedClasses = [];

		let classKeys = Object.keys(PlayerClass);
		classKeys = classKeys.splice(classKeys.length / 2, classKeys.length);

		for (let i = 0; i < classKeys.length; i++) {
			var text = classKeys[i];
			this.classes.push(text);

			if (this.spell && this.spell.Classes.indexOf(PlayerClass[text]) >= 0)
				this.selectedClasses.push(text);
		}

		this.schools = Object.keys(SpellSchool).map(key => SpellSchool[key]);

		this.formChange = this.formChange.bind(this);
	}

	ngOnInit() {
		this.formGroup = this.formBuilder.group(this.form);
		this.isNew = !!this.spell;
		this.formGroup.valueChanges.subscribe(form => this.formChange(form));
	}

	ngAfterViewInit() {}

	formChange(form: any): void {
		if (this.spellCard) this.spellCard.onChange();
	}

	//#region spell classes
	private addClass(): void {
		const control = this.formGroup.controls["classes"];
		if (!control) return;
		let value: string = control.value;
		if (!value) return;

		value = value.trim();

		if (this.spell.Classes.indexOf(PlayerClass[value]) === -1) {
			this.selectedClasses.push(value);
			this.spell.Classes.push(PlayerClass[value]);
		}

		control.setValue(null);
		this.spellCard.onChange();
	}

	private removeClass(pcStr: string): void {
		const pc = PlayerClass[pcStr];
		let index = this.selectedClasses.indexOf(pc);
		if (index >= 0) this.selectedClasses.splice(index, 1);

		index = this.spell.Classes.indexOf(pc);
		if (index >= 0) this.spell.Classes.splice(index, 1);

		this.spellCard.onChange();
	}

	private getClassName(pc: PlayerClass): string {
		return PlayerClass[pc];
	}
	//#endregion

	private getSchoolName(school: SpellSchool): string {
		return SpellSchool[school];
	}

	private handleComponentChange(type: string): void {
		switch (type) {
			case "v":
				this.spell.Components.Verbal = !this.spell.Components.Verbal;
				break;

			case "s":
				this.spell.Components.Somatic = !this.spell.Components.Somatic;
				break;

			case "m":
				if (
					this.spell.Components.Material ||
					this.spell.Components.Material === ""
				)
					this.spell.Components.Material = null;
				else this.spell.Components.Material = "";
				break;

			case "c":
				this.spell.Duration.Concentration = !this.spell.Duration.Concentration;
				break;

			case "a":
				if (this.spell.AtHigherLevels || this.spell.AtHigherLevels === "")
					this.spell.AtHigherLevels = null;
				else this.spell.AtHigherLevels = "";
				break;
		}
	}

	private save(): void {
		if (this.processing) return;
		this.processing = true;

		if (this.isNew) {
			this.processingMessage = `Creating your new spell: ${this.spell.Name}`;
			this.spellService.addSpell(this.spell).subscribe(o => this.handleSave(o));
		} else {
			this.processingMessage = `Editing your spell: ${this.spell.Name}`;
			this.spellService
				.saveSpell(this.spell)
				.subscribe(o => this.handleSave(o));
		}
	}

	private handleSave(result: any) {
		if (result.error) this.processError(result.error);
		else {
			const id = parseInt(result);

			if (isNaN(id)) this.errorMessage = this.knownErrors["API_ERR_UNK"];
			else this.spell.ID = id;
			this.isNew = false;
		}

		this.processing = false;
	}

	private delete(): void {
		if (this.processing) return;
		this.processing = true;
		this.processingMessage = `Deleting your spell: ${this.spell.Name}`;

		this.spellService.deleteSpell(this.spell).subscribe(r => {
			if (r.error) this.processError(r.error);
			this.processing = false;
		});
	}

	private processError(errorCode: string): void {
		this.errorMessage = this.knownErrors[errorCode];
		if (!this.errorMessage) this.errorMessage = this.knownErrors["API_ERR_UNK"];
	}
}
