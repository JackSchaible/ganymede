import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Spell } from "src/app/models/core/spells/spell";
import { select } from "@angular-redux/store";

@Component({
	selector: "gm-spell-edit",
	templateUrl: "./spell-edit.component.html",
	styleUrls: ["./spell-edit.component.scss"]
})
export class SpellEditComponent implements OnInit {
	@select(["app", "forms", "spell"])
	public spell$: Observable<Spell>;

	constructor() {}

	ngOnInit() {}
}
