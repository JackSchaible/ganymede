import { Component, Input, OnInit } from "@angular/core";
import { Spell } from "src/app/campaign/modules/spell/models/spell";
import { WordService } from "src/app/services/word.service";
import { Observable } from "rxjs";

@Component({
	selector: "gm-spell-display",
	templateUrl: "./spell-display.component.html",
	styleUrls: ["./spell-display.component.scss"]
})
export class SpellDisplayComponent implements OnInit {
	@Input()
	public spell$: Observable<Spell>;

	@Input()
	public autoOpen: boolean;

	public level: string;

	constructor(private words: WordService) {}

	ngOnInit() {
		this.spell$.subscribe((spell: Spell) => {
			this.level = spell.level + this.words.getSuffix(spell.level);
		});
	}
}
