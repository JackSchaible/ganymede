import { Component, OnInit, Input } from "@angular/core";
import Spell from "../models/monster/traits/spells/spell";
import { SpellSchool } from "../models/monster/classes/SpellData";
import { PlayerClass } from "../models/values";
import SpellComponents from "../models/monster/traits/spells/spellComponents";
import { WordService } from "src/app/services/word.service";

@Component({
	selector: "gm-spell-card",
	templateUrl: "./spell-card.component.html",
	styleUrls: ["./spell-card.component.scss"]
})
export class SpellCardComponent implements OnInit {
	@Input()
	public spell: Spell;

	private cardColor: string;
	private spellLevel: string;

	constructor(private words: WordService) {
		if (!this.spell)
			this.spell = new Spell(
				"Spell Name",
				0,
				SpellSchool.Abjuration,
				[PlayerClass.Bard],
				"1 Round",
				"Touch",
				new SpellComponents(true, true, null),
				"Instantaneous",
				["Spell description goes here"],
				null
			);

		this.cardColor = "red";
	}

	ngOnInit() {
		this.spellLevel = this.spell.Level + this.words.getSuffix(this.spell.Level);
	}
}
