import { Component, OnChanges, Input, OnInit } from "@angular/core";
import Monster from "../models/monster";
import { CalculatorService } from "../../services/calculator.service";
import Alignment from "../models/alignment";
import BasicInfo from "../models/basicInfo";
import Stats from "../models/stats/stats";
import ExtraInfo from "../models/extraInfo";

@Component({
	selector: "gm-monster-card",
	templateUrl: "./monster-card.component.html",
	styleUrls: ["./monster-card.component.scss"]
})
export class MonsterCardComponent implements OnChanges, OnInit {
	@Input()
	monster: Monster;

	private alignmentString: string;

	private strMod: string;
	private dexMod: string;
	private conMod: string;
	private intMod: string;
	private wisMod: string;
	private chaMod: string;

	private cr: string;
	private xp: number;

	constructor(private calc: CalculatorService) {
		if (!this.monster) this.monster = Monster.MakeDefault();
	}

	ngOnInit() {
		this.CalculateValues();
	}

	ngOnChanges() {
		this.CalculateValues();
	}

	public CalculateValues(): void {
		this.alignmentString = this.calc.GetAlignmentString(
			this.monster.BasicInfo.Alignment
		);

		const str = this.monster ? this.monster.Stats.Strength : 10;
		const dex = this.monster ? this.monster.Stats.Dexterity : 10;
		const con = this.monster ? this.monster.Stats.Constitution : 10;
		const int = this.monster ? this.monster.Stats.Intelligence : 10;
		const wis = this.monster ? this.monster.Stats.Wisdom : 10;
		const cha = this.monster ? this.monster.Stats.Charisma : 10;

		let mod = Math.floor((str - 10) / 2);
		this.strMod = `${mod < 0 ? "" : "+"}${mod}`;

		mod = Math.floor((dex - 10) / 2);
		this.dexMod = `${mod < 0 ? "" : "+"}${mod}`;

		mod = Math.floor((con - 10) / 2);
		this.conMod = `${mod < 0 ? "" : "+"}${mod}`;

		mod = Math.floor((int - 10) / 2);
		this.intMod = `${mod < 0 ? "" : "+"}${mod}`;

		mod = Math.floor((wis - 10) / 2);
		this.wisMod = `${mod < 0 ? "" : "+"}${mod}`;

		mod = Math.floor((cha - 10) / 2);
		this.chaMod = `${mod < 0 ? "" : "+"}${mod}`;

		const c = this.monster ? this.monster.ExtraInfo.Challenge : 0;
		this.xp = this.calc.CrToXP(c);
		this.cr = this.calc.getCrString(c);

		this.calc.calcAC(this.monster.Stats);

		this.monster.Stats.HPAverage = Math.floor(
			this.monster.Stats.HPRoll.Count *
				((this.monster.Stats.HPRoll.Sides + 1) / 2)
		);

		this.calc.calcPP(this.monster.Stats);
	}

	private getPP(): number {
		return this.calc.calcPP(this.monster.Stats);
	}
}
