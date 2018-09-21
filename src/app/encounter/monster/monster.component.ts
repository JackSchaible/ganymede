import {
	Component,
	Input,
	OnInit,
	OnChanges,
	SimpleChanges,
	ViewChild
} from "@angular/core";
import Monster from "../../common/models/monster";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Values, { ISize, IMonsterType } from "../../common/models/values";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatSnackBar } from "@angular/material";
import Alignment from "../../common/models/alignment";
import { MonsterCardComponent } from "../../common/monster-card/monster-card.component";

@Component({
	selector: "gm-monster",
	templateUrl: "./monster.component.html",
	styleUrls: ["./monster.component.scss"]
})
export class MonsterComponent implements OnInit, OnChanges {
	@Input()
	public monster: Monster;

	@ViewChild(MonsterCardComponent)
	private card: MonsterCardComponent;

	private basicInfoFormGroup: FormGroup;
	private sizes: ISize[] = Values.Sizes;
	private types: IMonsterType[] = Values.Types;
	private selectedType: IMonsterType;
	readonly separatorKeysCodes: number[] = [ENTER, COMMA];

	constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
		if (!this.monster)
			this.monster = new Monster(
				false,
				0,
				"",
				0,
				0,
				"",
				[],
				new Alignment(),
				"",
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				[],
				0,
				"",
				0,
				"",
				"",
				[],
				[],
				[],
				"",
				[]
			);

		this.alignmentChanged = this.alignmentChanged.bind(this);
	}

	public ngOnInit() {
		this.basicInfoFormGroup = this.formBuilder.group({
			name: [],
			size: [],
			type: []
		});

		this.basicInfoFormGroup.valueChanges.subscribe(form => {
			this.card.CalculateValues();

			if (form.type)
				for (let i = 0; i < this.types.length; i++)
					if (this.types[i].Name == form.type)
						this.selectedType = this.types[i];
		});
	}

	public ngOnChanges(changes: SimpleChanges) {
		console.log(changes);
	}

	private addTag(event) {
		const input = event.input;
		let value = event.value;

		if (value) {
			value = value.trim();

			if (this.monster.Tags.indexOf(value) === -1)
				this.monster.Tags.push(value);
			else this.openSnackBar("That tag already exists!");
		}

		if (input) input.value = "";
	}

	private removeTag(tag: string) {
		const index = this.monster.Tags.indexOf(tag);
		if (index >= 0) this.monster.Tags.splice(index, 1);
	}

	private alignmentChanged() {
		if (this.basicInfoFormGroup)
			this.basicInfoFormGroup.updateValueAndValidity({
				onlySelf: false,
				emitEvent: true
			});
	}

	openSnackBar(message: string) {
		let sb = this.snackBar.open(message);

		setTimeout(() => {
			sb.dismiss();
		}, 3000);
	}
}
