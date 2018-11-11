import { Component, Input } from "@angular/core";
import monster from "../../common/models/monster/monster";

@Component({
	selector: "gm-monster",
	templateUrl: "./monster.component.html",
	styleUrls: ["./monster.component.scss"]
})
export class MonsterComponent {
	@Input()
	public monster: monster;

	private form1Complete: boolean;
	private form2Complete: boolean;
	private form3Complete: boolean;
	private form4Complete: boolean;

	constructor() {
		if (!this.monster) this.monster = monster.newMonster();
	}
}
