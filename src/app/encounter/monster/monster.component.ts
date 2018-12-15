import { Component, Input } from "@angular/core";
import Monster from "../../common/models/monster/monster";

@Component({
	selector: "gm-monster",
	templateUrl: "./monster.component.html",
	styleUrls: ["./monster.component.scss"]
})
export class MonsterComponent {
	@Input()
	public monster: Monster;

	public form1Complete: boolean;
	public form2Complete: boolean;
	public form3Complete: boolean;
	public form4Complete: boolean;

	constructor() {
		if (!this.monster) this.monster = Monster.New();
	}
}
