import {
	Component,
	OnInit,
	Input,
	ViewChild,
	OnDestroy,
	ChangeDetectorRef
} from "@angular/core";
import Spell from "src/app/common/models/monster/traits/spells/spell";
import { PlayerClass } from "src/app/common/models/values";
import { FormGroup, FormBuilder } from "@angular/forms";
import { SpellCardComponent } from "src/app/common/spell-card/spell-card.component";
import spellData, {
	SpellSchool
} from "src/app/common/models/monster/classes/SpellData";
import { SpellService } from "src/app/services/spell.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
	selector: "gm-spell-edit",
	templateUrl: "./spell-edit.component.html"
})
export class SpellEditComponent implements OnInit, OnDestroy {
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
		durationAmount: [],
		description: [],
		atHigherLevels: []
	};

	private isNew: boolean;

	private selectedClasses: string[];

	private classes: string[];
	private schools: SpellSchool[];
	private castingTimes: string[] = spellData.castingTimes;
	private ranges: string[] = spellData.ranges;
	private durations: string[] = spellData.durations;

	private processing: boolean;
	private processingMessage: string;
	private errorMessage: string;
	private successMessage: string;
	private knownErrors: any = {
		API_ERR_UNK: "An unknown error has occurred. Please try again later."
	};
	private successTimeout: number = 10000;
	private deleteTimeout: number = 5000;
	private timeoutId: any;

	constructor(
		protected formBuilder: FormBuilder,
		private spellService: SpellService,
		private router: Router,
		private route: ActivatedRoute,
		private change: ChangeDetectorRef
	) {
		this.classes = [];
		this.selectedClasses = [];
		this.formChange = this.formChange.bind(this);

		if (!this.spell) this.spell = Spell.makeDefault();
	}

	ngOnInit() {
		this.route.params.subscribe(p => {
			const id = +p["spellId"];

			this.spellService.getSpell(id).subscribe(s => {
				this.spell = s;

				let classKeys = Object.keys(PlayerClass);
				classKeys = classKeys.splice(classKeys.length / 2, classKeys.length);

				for (let i = 0; i < classKeys.length; i++) {
					var text = classKeys[i];
					this.classes.push(text);

					if (this.spell && this.spell.classes.indexOf(PlayerClass[text]) >= 0)
						this.selectedClasses.push(text);
				}

				this.schools = Object.keys(SpellSchool).map(key => SpellSchool[key]);
				this.change.detectChanges();
			});
		});

		this.formGroup = this.formBuilder.group(this.form);
		this.isNew = !!this.spell;
		this.formGroup.valueChanges.subscribe(form => this.formChange(form));
	}

	ngOnDestroy(): void {
		clearTimeout(this.timeoutId);
	}

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

		if (this.spell.classes.indexOf(PlayerClass[value]) === -1) {
			this.selectedClasses.push(value);
			this.spell.classes.push(PlayerClass[value]);
		}

		control.setValue(null);
		this.spellCard.onChange();
	}

	private removeClass(pcStr: string): void {
		const pc = PlayerClass[pcStr];
		let index = this.selectedClasses.indexOf(pc);
		if (index >= 0) this.selectedClasses.splice(index, 1);

		index = this.spell.classes.indexOf(pc);
		if (index >= 0) this.spell.classes.splice(index, 1);

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
				this.spell.components.verbal = !this.spell.components.verbal;
				break;

			case "s":
				this.spell.components.somatic = !this.spell.components.somatic;
				break;

			case "m":
				if (
					this.spell.components.material ||
					this.spell.components.material === ""
				)
					this.spell.components.material = null;
				else this.spell.components.material = "";
				break;

			case "c":
				this.spell.duration.concentration = !this.spell.duration.concentration;
				break;

			case "a":
				if (this.spell.atHigherLevels || this.spell.atHigherLevels === "")
					this.spell.atHigherLevels = null;
				else this.spell.atHigherLevels = "";
				break;
		}
	}

	private save(): void {
		if (this.processing) return;
		this.processing = true;

		if (this.isNew) {
			this.processingMessage = `Creating your new spell: ${this.spell.name}`;
			this.spellService.addSpell(this.spell).subscribe(o => this.handleSave(o));
		} else {
			this.processingMessage = `Editing your spell: ${this.spell.name}`;
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
			else this.spell.spellID = id;
			this.successMessage = `Your spell ${
				this.spell.name
				} has been successfully ${this.isNew ? "created" : "updated"}!`;
			this.isNew = false;

			this.timeoutId = setTimeout(() => {
				this.successMessage = null;
			}, this.successTimeout);
		}

		this.processing = false;
	}

	private delete(): void {
		if (this.processing) return;
		this.processing = true;
		this.processingMessage = `Deleting your spell: ${this.spell.name}`;

		this.spellService.deleteSpell(this.spell).subscribe(r => {
			this.processing = false;

			if (r.error) this.processError(r.error);
			else {
				this.successMessage = `Your spell ${
					this.spell.name
					} has been successfully deleted!`;
				this.timeoutId = setTimeout(() => {
					this.successMessage = null;
					this.router.navigateByUrl("/spells");
				}, this.deleteTimeout);
			}
		});
	}

	private processError(errorCode: string): void {
		this.errorMessage = this.knownErrors[errorCode];
		if (!this.errorMessage) this.errorMessage = this.knownErrors["API_ERR_UNK"];
	}
}
