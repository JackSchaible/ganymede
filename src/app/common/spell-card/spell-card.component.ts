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
		this.spell = new Spell(
			"Resurrection",
			7,
			SpellSchool.Necromancy,
			[PlayerClass.Bard, PlayerClass.Cleric],
			"1 hour",
			"Touch",
			new SpellComponents(
				true,
				true,
				"A diamond worth at least 1,000 gp, which the spell consumes"
			),
			"Instantaneous",
			`<p>You touch a dead creature that has been dead for no more than a century, that didn't die of old age, and that isn't Undead. If its soul is free and willing, the target returns to life with all its Hit Points.</p><p>This spell neutralizes any Poisons and cures normal Diseases afflicting the creature when it died. It doesn't, however, remove magical Diseases, curses, and the like, if such affects aren't removed prior to casting the spell, they afflict the target on its return to life.</p><p>This spell closes all mortal wounds and restores any missing body parts.</p><p>Coming back from the dead is an ordeal. The target takes a -4 penalty to all Attack rolls, Saving Throws, and Ability Checks. Every time the target finishes a Long Rest, the penalty is reduced by 1 until it disappears.</p><p>Casting this spell to restore life to a creature that has been dead for one year or longer taxes you greatly. Until you finish a Long Rest, you can't cast Spells again, and you have disadvantage on all Attack rolls, Ability Checks, and Saving Throws.</p>`,
			null
		);

		this.cardColor = "red";
	}

	ngOnInit() {
		this.spellLevel = this.spell.Level + this.words.getSuffix(this.spell.Level);
	}
}
