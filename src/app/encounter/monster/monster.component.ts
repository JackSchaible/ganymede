import { Component, Input, OnInit, ViewChild } from "@angular/core";
import Monster from "../../common/models/monster";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Values, { ISize, IMonsterType } from "../../common/models/values";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatSnackBar, MatCheckboxChange } from "@angular/material";
import { MonsterCardComponent } from "../../common/monster-card/monster-card.component";
import { CalculatorService } from "../../services/calculator.service";
import MovementType from "../../common/models/stats/movementType";
import Sense from "../../common/models/features/sense";
import Skill, { SkillGroup } from "../../common/models/features/skill";
import Feature from "../../common/models/feature";

@Component({
	selector: "gm-monster",
	templateUrl: "./monster.component.html",
	styleUrls: ["./monster.component.scss"]
})
export class MonsterComponent {
	@Input()
	public monster: Monster;

	@ViewChild(MonsterCardComponent)
	private card: MonsterCardComponent;

	private form1Complete: boolean;
	private form2Complete: boolean;
	private form3Complete: boolean;
	private form4Complete: boolean;

	constructor(private snackBar: MatSnackBar) {
		if (!this.monster) this.monster = Monster.New();
		this.formChanged = this.formChanged.bind(this);
	}

	public formChanged() {
		this.card.CalculateValues();
	}

	public openSnackBar(message: string) {
		const sb = this.snackBar.open(message);

		setTimeout(() => {
			sb.dismiss();
		}, 3000);
	}
}
