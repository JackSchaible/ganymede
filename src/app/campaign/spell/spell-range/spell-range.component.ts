import { Component, Input } from "@angular/core";
import { SpellRange } from "src/app/models/core/spells/spellRange";

@Component({
	selector: "gm-spell-range",
	templateUrl: "./spell-range.component.html"
})
export class SpellRangeComponent {
	@Input()
	public range: SpellRange;
}
