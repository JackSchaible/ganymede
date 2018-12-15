import { Component, OnInit } from "@angular/core";

@Component({
	selector: "gm-spells-list",
	templateUrl: "./spells-list.component.html",
	styleUrls: ["./spells-list.component.scss"]
})
export class SpellsListComponent implements OnInit {
	public columnsToDisplay: number = 7;

	constructor() {}

	ngOnInit() {}

	public applyFilter(value: string): void {}
}
