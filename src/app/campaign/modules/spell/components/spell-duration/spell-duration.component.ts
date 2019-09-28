import { Component, Input } from "@angular/core";
import { SpellDuration } from "src/app/campaign/modules/spell/models/spellDuration";

@Component({
	selector: "gm-spell-duration",
	templateUrl: "./spell-duration.component.html",
	styleUrls: ["./spell-duration.component.scss"]
})
export class SpellDurationComponent {
	@Input()
	public duration: SpellDuration;
}
