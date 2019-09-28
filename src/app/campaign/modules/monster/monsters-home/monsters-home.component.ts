import { Component, OnInit } from "@angular/core";
import { MonsterService } from "../monster.service";
import { ActivatedRoute } from "@angular/router";
import { Monster } from "../models/monster";

@Component({
	selector: "gm-monsters-home",
	templateUrl: "./monsters-home.component.html",
	styleUrls: ["./monsters-home.component.scss"]
})
export class MonstersHomeComponent implements OnInit {
	public processing: boolean;
	public monsters: Monster[];

	private allMonsters: Monster[];

	constructor(private service: MonsterService, private route: ActivatedRoute) {}

	ngOnInit() {
		this.processing = true;
		const id: number = parseInt(this.route.snapshot.paramMap.get("id"), 10);

		this.service.getMonsters(id).subscribe(
			(monsters: Monster[]) => {
				this.monsters = this.allMonsters = monsters;
				this.processing = false;
			},
			() => {
				this.processing = false;
			}
		);
	}

	public edit(id: number): void {}
	public clone(monster: Monster): void {}
	public delete(monster: Monster): void {}
}
