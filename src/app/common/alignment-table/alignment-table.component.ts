import { Component, OnInit, Input } from "@angular/core";
import Alignment from "../models/monster/alignment";

@Component({
	selector: "gm-alignment-table",
	templateUrl: "./alignment-table.component.html",
	styleUrls: ["./alignment-table.component.scss"]
})
export class AlignmentTableComponent implements OnInit {
	@Input()
	public alignment: Alignment;

	@Input()
	public changeCallback: any;

	constructor() {}

	ngOnInit() {}

	public set(option: string): void {
		switch (option) {
			case "x":
				this.alignment.chaoticGood = true;
				this.alignment.chaoticNeutral = true;
				this.alignment.chaoticEvil = true;
				this.alignment.neutralGood = true;
				this.alignment.neutral = true;
				this.alignment.neutralEvil = true;
				this.alignment.lawfulGood = true;
				this.alignment.lawfulNeutral = true;
				this.alignment.lawfulEvil = true;
				break;

			case "l":
				this.alignment.lawfulEvil = true;
				this.alignment.lawfulGood = true;
				this.alignment.lawfulNeutral = true;
				break;

			case "n1":
				this.alignment.neutralGood = true;
				this.alignment.neutral = true;
				this.alignment.neutralEvil = true;
				break;

			case "c":
				this.alignment.chaoticEvil = true;
				this.alignment.chaoticGood = true;
				this.alignment.chaoticNeutral = true;
				break;

			case "g":
				this.alignment.chaoticGood = true;
				this.alignment.lawfulGood = true;
				this.alignment.neutralGood = true;
				break;

			case "n2":
				this.alignment.lawfulNeutral = true;
				this.alignment.chaoticNeutral = true;
				this.alignment.neutral = true;
				break;

			case "e":
				this.alignment.chaoticEvil = true;
				this.alignment.lawfulEvil = true;
				this.alignment.neutralEvil = true;
				break;

			case "lg":
				this.alignment.lawfulGood = !this.alignment.lawfulGood;
				break;

			case "ng":
				this.alignment.neutralGood = !this.alignment.neutralGood;
				break;

			case "cg":
				this.alignment.chaoticGood = !this.alignment.chaoticGood;
				break;

			case "ln":
				this.alignment.lawfulNeutral = !this.alignment.lawfulNeutral;
				break;

			case "n":
				this.alignment.neutral = !this.alignment.neutral;
				break;

			case "cn":
				this.alignment.chaoticNeutral = !this.alignment.chaoticNeutral;
				break;

			case "ce":
				this.alignment.chaoticEvil = !this.alignment.chaoticEvil;
				break;

			case "ne":
				this.alignment.neutralEvil = !this.alignment.neutralEvil;
				break;

			case "le":
				this.alignment.lawfulEvil = !this.alignment.lawfulEvil;
				break;
		}

		if (this.changeCallback) this.changeCallback();
	}
}
