import { Component, Input } from "@angular/core";
import { SpellComponents } from "src/app/campaign/modules/spell/models/spellComponents";

@Component({
	selector: "gm-spell-components",
	templateUrl: "./spell-components.component.html"
})
export class SpellComponentsComponent {
	@Input()
	public components: SpellComponents;
}
