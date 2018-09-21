import { Component, OnChanges, Input, OnInit } from "@angular/core";
import Monster from "../models/monster";
import { CalculatorService } from "../../services/calculator.service";
import Alignment from "../models/alignment";

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
		if (!this.monster)
			this.monster = new Monster(
				false,
				0,
				"Unnamed",
				0,
				0,
				"Unknown",
				[],
				new Alignment(),
				"Medium",
				10,
				10,
				10,
				10,
				10,
				10,
				0,
				0,
				[],
				10,
				null,
				0,
				"0d0+0",
				"passive Perception 10",
				[],
				[],
				[],
				null,
				[]
			);
	}

	ngOnInit() {
		this.CalculateValues();
	}

	ngOnChanges() {
		this.CalculateValues();
	}

	public CalculateValues(): void {
		this.alignmentString = this.calc.GetAlignmentString(this.monster.Alignment);

		const str = this.monster ? this.monster.Strength : 10;
		const dex = this.monster ? this.monster.Dexterity : 10;
		const con = this.monster ? this.monster.Constitution : 10;
		const int = this.monster ? this.monster.Intelligence : 10;
		const wis = this.monster ? this.monster.Wisdom : 10;
		const cha = this.monster ? this.monster.Charisma : 10;

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

		const c = this.monster ? this.monster.Challenge : 0;
		this.xp = this.calc.CrToXP(c);
		this.cr = this.calc.getCrString(c);
	}
}
