import { Component, Input, OnInit } from "@angular/core";
import Monster from "../../common/models/monster";
import { CalculatorService } from "../../services/calculator.service";
import { MonsterCardComponent } from "../../common/monster-card/MonsterCardComponent";

@Component({
	selector: "gm-monster",
	templateUrl: "./monster.component.html",
	styleUrls: ["./monster.component.scss"]
})
export class MonsterComponent {
	@Input()
	monster: Monster;

	private strMod: string;
	private dexMod: string;
	private conMod: string;
	private intMod: string;
	private wisMod: string;
	private chaMod: string;

	private cr: string;
	private xp: number;

	constructor(private calc: CalculatorService) {
		if (!this.monster)
			this.monster = new Monster(
				false,
				0,
				"Unnamed",
				0,
				0,
				"Unknown",
				"Unknown",
				"Medium",
				10,
				10,
				10,
				10,
				10,
				10,
				0,
				0,
				[],
				10,
				null,
				0,
				"0d0+0",
				"passive Perception 10",
				[],
				[],
				[],
				null,
				[]
			);

		// this.monster = new Monster(
		// 	false,
		// 	0,
		// 	"Space Whale",
		// 	0.25,
		// 	0,
		// 	"Unaligned",
		// 	"Beast",
		// 	"Huge",
		// 	13,
		// 	15,
		// 	12,
		// 	8,
		// 	14,
		// 	10,
		// 	2,
		// 	5,
		// 	["fly 60", "swim 30"],
		// 	13,
		// 	null,
		// 	19,
		// 	"3d10+3",
		// 	"Blindsight 120 ft., passive perception 15",
		// 	[
		// 		new Description("Skills", "Perception +5, Stealth +4"),
		// 		new Description(
		// 			"Vulnerabilities",
		// 			"Acid, Force, Necrotic, Piercing, Poison"
		// 		),
		// 		new Description(
		// 			"Damage Resistances",
		// 			"Cold, Fire, Lightning, Radiant, Thunder"
		// 		),
		// 		new Description(
		// 			"Languages",
		// 			"Understands Nordic, Common, and Elvish, But Can't Speak"
		// 		)
		// 	],
		// 	[
		// 		new Description(
		// 			"Anaerobic Respiration",
		// 			"The Space Whale does not need to breathe."
		// 		),
		// 		new Description(
		// 			"Camouflage",
		// 			"The Space Whale has advantage on Dexterity (Stealth) checks made while underwater or in outer space (at least 1,000km from the surface of a planet or other celestial object)."
		// 		),
		// 		new Description(
		// 			"Light-Sensitivity",
		// 			"The Space Whale's blindsight is reduced to 15 ft. in bright sunlight."
		// 		),
		// 		new Description(
		// 			"Tentacles",
		// 			"The Space Whale has extremely long tentacles, reaching 100,000 times it's body length."
		// 		),
		// 		new Description(
		// 			"Mana Battery",
		// 			"The Space Whale can absorb and discharge magic power. It has a reserve of spell slots it can channel mana into. When hit with a spell of first level or lower, that spell is absorbed into an empty spell slot, depending on the level of the spell. The Whale is a 1st-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 12, +2 to hit with spell attacks):<br />• Cantrips (at will): dancing lights, minor illusion, thaumaturgy<br />• 1st level (3 slots): color spray, cure wounds, silent image<br />"
		// 		)
		// 	],
		// 	[
		// 		new Description(
		// 			"Tentacles",
		// 			"<i>Melee Weapon Attack:</i> +4 to hit, reach 5 ft., one target. <i>Hit:</i> (2d4+1) bludgeoning damage. The target is grappled (escape DC12 + your proficiency) The Space Whale can grapple two targets at once."
		// 		)
		// 	],
		// 	null,
		// 	[]
		// );
	}
}
