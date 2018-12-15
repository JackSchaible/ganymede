import {
	Component,
	OnChanges,
	Input,
	OnInit,
	ChangeDetectorRef
} from "@angular/core";
import Monster from "../models/monster/monster";
import { CalculatorService } from "../../services/calculator.service";
import Values from "../models/values";
import { WordService } from "../../services/word.service";
import Skill from "../models/monster/features/skill";
import { Spellcasting } from "../models/monster/traits/spells/spells";
import SpellcastingClass from "../models/monster/classes/SpellcastingClass";

@Component({
	selector: "gm-monster-card",
	templateUrl: "./monster-card.component.html",
	styleUrls: ["./monster-card.component.scss"]
})
export class MonsterCardComponent implements OnChanges, OnInit {
	@Input()
	monster: Monster;

	public alignmentString: string;

	public strMod: string;
	public dexMod: string;
	public conMod: string;
	public intMod: string;
	public wisMod: string;
	public chaMod: string;

	public cr: string;
	public xp: number;

	constructor(
		private calc: CalculatorService,
		private change: ChangeDetectorRef,
		private words: WordService
	) {
		if (!this.monster) this.monster = Monster.MakeDefault();
	}

	ngOnInit() {
		this.CalculateValues();
	}

	ngOnChanges() {
		this.CalculateValues();
	}

	public CalculateValues(): void {
		this.alignmentString = this.calc.GetAlignmentString(
			this.monster.BasicInfo.Alignment
		);

		const str = this.monster ? this.monster.Stats.Strength : 10;
		const dex = this.monster ? this.monster.Stats.Dexterity : 10;
		const con = this.monster ? this.monster.Stats.Constitution : 10;
		const int = this.monster ? this.monster.Stats.Intelligence : 10;
		const wis = this.monster ? this.monster.Stats.Wisdom : 10;
		const cha = this.monster ? this.monster.Stats.Charisma : 10;

		let mod = Math.floor((str - 10) / 2);
		this.strMod = `${mod < 0 ? "" : "+"}${mod}`;

		mod = Math.floor((dex - 10) / 2);
		this.dexMod = `${mod < 0 ? "" : "+"}${mod}`;

		mod = Math.floor((con - 10) / 2);
		this.conMod = `${mod < 0 ? "" : "+"}${mod}`;

		mod = Math.floor((int - 10) / 2);
		this.intMod = `${mod < 0 ? "" : "+"}${mod}`;

		mod = Math.floor((wis - 10) / 2);
		this.wisMod = `${mod < 0 ? "" : "+"}${mod}`;

		mod = Math.floor((cha - 10) / 2);
		this.chaMod = `${mod < 0 ? "" : "+"}${mod}`;

		const c = this.monster ? this.monster.Features.Challenge : 0;
		this.xp = this.calc.CrToXP(c);
		this.cr = this.calc.getCrString(c);

		this.calc.calcAC(this.monster.Stats);

		this.monster.Stats.HPAverage = Math.floor(
			this.monster.Stats.HPRoll.Count *
				((this.monster.Stats.HPRoll.Sides + 1) / 2)
		);

		this.calc.calcPP(this.monster.Stats);
		this.change.markForCheck();
		this.change.detectChanges();
	}

	public getPP(): number {
		return this.calc.calcPP(this.monster.Stats);
	}

	public getST(savingThrow: Skill): string {
		let num = this.calc.calcSavingThrow(savingThrow, this.monster);
		return (num >= 0 ? "+" : "-") + num;
	}

	public getSkill(skill: Skill): string {
		let num = this.calc.calcSkill(skill, this.monster);

		for (let i = 0; i < Values.Skills.length; i++) {
			for (let j = 0; j < Values.Skills[i].Skills.length; j++)
				if (
					skill.Name === Values.Skills[i].Skills[j].Name &&
					skill.ModifyingAbility === Values.Skills[i].Ability
				) {
					return `${skill.Name} ${num >= 0 ? "+" : "-"}${num}`;
				} else {
					return `${skill.ModifyingAbility} (${skill.Name}) ${
						num >= 0 ? "+" : "-"
					}${num}`;
				}
		}

		return `${skill.ModifyingAbility} (${skill.Name}) ${
			num >= 0 ? "+" : "-"
		}${num}`;
	}

	public getSpellsaveDC(): number {
		return (
			8 +
			this.monster.BasicInfo.ProficiencyModifier +
			this.calc.getModifierByName(
				((this.monster.Traits.Spells as Spellcasting).ClassInstance
					.BaseClass as SpellcastingClass).SpellcastingAbility,
				this.monster
			)
		);
	}

	public getSpellAttackMod(): string {
		const num =
			this.monster.BasicInfo.ProficiencyModifier +
			this.calc.getModifierByName(
				((this.monster.Traits.Spells as Spellcasting).ClassInstance
					.BaseClass as SpellcastingClass).SpellcastingAbility,
				this.monster
			);

		return (num >= 0 ? "+" : "-") + num;
	}

	public getSpellSlots(): any[] {
		const instance = (this.monster.Traits.Spells as Spellcasting).ClassInstance;
		const base = instance.BaseClass as SpellcastingClass;

		let slots = [];
		const slotAllotment = base.SpellAdvancement[instance.Level - 1];

		slots.push({
			Name: "Cantrips",
			Slots: base.Cantrips[instance.Level]
		});

		for (let i = 0; i < slotAllotment.length; i++) {
			if (slotAllotment[i] === 0) continue;
			slots.push({
				Name: i + 1 + this.words.getSuffix(i) + " Level",
				Slots: slotAllotment[i]
			});
		}

		return slots;
	}
}
