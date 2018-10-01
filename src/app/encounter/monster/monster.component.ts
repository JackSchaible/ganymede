import { Component, Input } from "@angular/core";
import Monster from "../../common/models/monster";

@Component({
	selector: "gm-monster",
	templateUrl: "./monster.component.html",
	styleUrls: ["./monster.component.scss"]
})
export class MonsterComponent {
	@Input()
	public monster: Monster;

	private form1Complete: boolean;
	private form2Complete: boolean;
	private form3Complete: boolean;
	private form4Complete: boolean;

	constructor() {
		if (!this.monster) this.monster = Monster.New();
	}
}
