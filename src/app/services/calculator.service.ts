import { Injectable } from "@angular/core";
import fraction from "../common/fraction";
import alignment from "../common/models/monster/alignment";
import { diceOptions } from "../common/models/generic/diceOptions";
import dice from "../common/models/generic/dice";
import monster from "../common/models/monster/monster";
import armorClass from "../common/models/monster/stats/armorClass";
import stats from "../common/models/monster/stats/stats";
import skill from "../common/models/monster/features/skill";

@Injectable({
	providedIn: "root"
})
export class CalculatorService {
	constructor() {}

	public getModifier(score: number): string {
		const mod = this.getModifierNumber(score);
		return `${score} (${mod < 0 ? "" : "+"}${mod})`;
	}

	public getModifierNumber(score: number): number {
		return Math.floor((score - 10) / 2);
	}

	public getCrString(challenge: number) {
		if (challenge < 1 && challenge > 0)
			return this.realToFraction(challenge, 0.0000001).toString();
		else return challenge.toString();
	}

	private realToFraction(value: number, accuracy: number): fraction {
		if (accuracy <= 0.0 || accuracy >= 1.0)
			throw new Error("Must be > 0 and < 1.");

		let sign: number = Math.sign(value);

		if (sign == -1) {
			value = Math.abs(value);
		}

		let maxError = sign == 0 ? accuracy : value * accuracy;
		let n: number = Math.floor(value);
		value -= n;

		if (value < maxError) return new fraction(sign * n, 1);
		if (1 - maxError < value) return new fraction(sign * (n + 1), 1);

		let lower_n: number = 0;
		let lower_d: number = 1;

		let upper_n: number = 1;
		let upper_d: number = 1;

		while (true) {
			let middle_n: number = lower_n + upper_n;
			let middle_d: number = lower_d + upper_d;

			if (middle_d * (value + maxError) < middle_n) {
				upper_n = middle_n;
				upper_d = middle_d;
			} else if (middle_n < (value - maxError) * middle_d) {
				lower_n = middle_n;
				lower_d = middle_d;
			} else return new fraction((n * middle_d + middle_n) * sign, middle_d);
		}
	}

	public crToXP(cr: number): number {
		let xp = 0;

		if (cr < 0.125) xp = 10;
		else if (cr === 0.125) xp = 25;
		else if (cr === 0.25) xp = 50;
		else if (cr === 0.5) xp = 100;
		else if (cr === 1) xp = 200;
		else if (cr === 2) xp = 450;
		else if (cr === 3) xp = 700;
		else if (cr === 4) xp = 1100;
		else if (cr === 5) xp = 1800;
		else if (cr === 6) xp = 2300;
		else if (cr === 7) xp = 2900;
		else if (cr === 8) xp = 3900;
		else if (cr === 9) xp = 5000;
		else if (cr === 10) xp = 5900;
		else if (cr === 11) xp = 7200;
		else if (cr === 12) xp = 8400;
		else if (cr === 13) xp = 10000;
		else if (cr === 14) xp = 11500;
		else if (cr === 15) xp = 13000;
		else if (cr === 16) xp = 15000;
		else if (cr === 17) xp = 18000;
		else if (cr === 18) xp = 20000;
		else if (cr === 19) xp = 22000;
		else if (cr === 20) xp = 25000;
		else if (cr === 21) xp = 33000;
		else if (cr === 22) xp = 41000;
		else if (cr === 23) xp = 50000;
		else if (cr === 24) xp = 62000;
		else if (cr === 25) xp = 75000;
		else if (cr === 26) xp = 90000;
		else if (cr === 27) xp = 105000;
		else if (cr === 28) xp = 120000;
		else if (cr === 29) xp = 135000;
		else if (cr === 30) xp = 155000;

		return xp;
	}

	public getAlignmentString(alignment: alignment): string {
		let results = [];

		const o1 = alignment.lawfulGood;
		const o2 = alignment.neutralGood;
		const o3 = alignment.chaoticGood;
		const o4 = alignment.lawfulNeutral;
		const o5 = alignment.neutral;
		const o6 = alignment.chaoticNeutral;
		const o7 = alignment.lawfulEvil;
		const o8 = alignment.neutralEvil;
		const o9 = alignment.chaoticEvil;

		if (o1 && o2 && o3 && o4 && o5 && o6 && o7 && o8 && o9)
			results.push("Any Alignment");
		else {
			if (o1 && o2 && o3) results.push("Any Good");
			if (o4 && o5 && o6) results.push("Any Lawful/Neutral/Chaotic Neutral");
			if (o7 && o8 && o9) results.push("Any Evil");
			if (o1 && o4 && o7) results.push("Any Lawful");
			if (o2 && o5 && o8) results.push("Any Good/Neutral/Evil Neutral");
			if (o3 && o6 && o9) results.push("Any Chaotic.");

			if (
				o1 &&
				results.indexOf("Any Good") === -1 &&
				results.indexOf("Any Lawful") === -1
			)
				results.push("Lawful Good");

			if (
				o2 &&
				results.indexOf("Any Good") === -1 &&
				results.indexOf("Any Good/Neutral/Evil Neutral") === -1
			)
				results.push("Neutral Good");

			if (
				o3 &&
				results.indexOf("Any Good") === -1 &&
				results.indexOf("Any Chaotic") === -1
			)
				results.push("Chaotic Good");

			if (
				o4 &&
				results.indexOf("Any Lawful/Neutral/Chaotic Neutral") === -1 &&
				results.indexOf("Any Lawful") === -1
			)
				results.push("Lawful Neutral");

			if (
				o5 &&
				results.indexOf("Any Lawful/Neutral/Chaotic Neutral") === -1 &&
				results.indexOf("Any Good/Neutral/Evil Neutral") === -1
			)
				results.push("True Neutral");

			if (
				o6 &&
				results.indexOf("Any Lawful/Neutral/Chaotic Neutral") === -1 &&
				results.indexOf("Any Chaotic") === -1
			)
				results.push("Chaotic Neutral");

			if (
				o7 &&
				results.indexOf("Any Evil") === -1 &&
				results.indexOf("Any Lawful") === -1
			)
				results.push("Lawful Evil");

			if (
				o8 &&
				results.indexOf("Any Evil") === -1 &&
				results.indexOf("Any Good/Neutral/Evil Neutral") === -1
			)
				results.push("Neutral Evil");

			if (
				o9 &&
				results.indexOf("Any Evil") === -1 &&
				results.indexOf("Any Chaotic") === -1
			)
				results.push("Chaotic Evil");
		}

		if (results.length === 0) results.push("Unaligned");

		let result = "";

		for (let i = 0; i < results.length; i++) {
			if (i == 0) result = results[i];
			else {
				if (i == results.length - 1) result += ", or " + results[i];
				else result += ", " + results[i];
			}
		}

		return result;
	}

	public randomStats(stats: stats): void {
		const statDice = new dice(4, 6);
		const options = [diceOptions.dropTheLowest];

		stats.strength = this.roll(statDice, options);
		stats.dexterity = this.roll(statDice, options);
		stats.constitution = this.roll(statDice, options);
		stats.intelligence = this.roll(statDice, options);
		stats.wisdom = this.roll(statDice, options);
		stats.charisma = this.roll(statDice, options);

		const dexMod = this.getModifierNumber(stats.dexterity);
		stats.ac = new armorClass(10, "DEX", 0);
		stats.hpRoll.modifier = this.getModifierNumber(stats.constitution);
		stats.initiative = dexMod;
	}

	public roll(dice: dice, options: diceOptions[]): number {
		let rolls: number[] = [];
		let currentRoll = 1;

		for (let i = 0; i < dice.count; i++) {
			if (options.indexOf(diceOptions.rerollOnes) > -1)
				while (currentRoll === 1) currentRoll = this.random(1, dice.sides);
			else if (options.indexOf(diceOptions.allUnique) > -1) {
				if (dice.count === dice.sides)
					throw "Count must less than sides if AllUnique is selected as an option.";
				while (rolls.indexOf(currentRoll) > -1)
					currentRoll = this.random(1, dice.sides);
			} else currentRoll = this.random(1, dice.sides);

			rolls.push(currentRoll);
		}

		if (options.indexOf(diceOptions.dropTheLowest) > -1)
			rolls.splice(rolls.indexOf(Math.min(...rolls)), 1);

		return rolls.reduce((a, b) => a + b, 0);
	}

	public calcAC(stats: stats) {
		const b = stats.ac.base;

		let a: number = 0;
		switch (stats.ac.abilityModifier) {
			case "STR":
				a = stats.strength;
				break;
			case "DEX":
				a = stats.dexterity;
				break;
			case "CON":
				a = stats.constitution;
				break;
			case "INT":
				a = stats.intelligence;
				break;
			case "WIS":
				a = stats.wisdom;
				break;
			case "CHA":
				a = stats.charisma;
				break;
		}
		a = this.getModifierNumber(a);

		const m = stats.ac.miscModifier;

		stats.ac.score = b + a + m;
	}

	public calcPP(stats: stats): number {
		return 10 + this.getModifierNumber(stats.wisdom);
	}

	public calcSavingThrow(savingThrow: skill, monster: monster): number {
		return (
			this.getModifierByName(savingThrow.name, monster) +
			monster.basicInfo.proficiencyModifier * savingThrow.proficiency
		);
	}

	public calcSkill(skill: skill, monster: monster): number {
		return (
			this.getModifierByName(skill.modifyingAbility, monster) +
			monster.basicInfo.proficiencyModifier * skill.proficiency
		);
	}

	public getModifierByName(name: string, monster: monster) {
		let mod = 0;

		switch (name) {
			case "Strength":
				mod = this.getModifierNumber(monster.stats.strength);
				break;
			case "Dexterity":
				mod = this.getModifierNumber(monster.stats.dexterity);
				break;
			case "Constitution":
				mod = this.getModifierNumber(monster.stats.constitution);
				break;
			case "Intelligence":
				mod = this.getModifierNumber(monster.stats.intelligence);
				break;
			case "Wisdom":
				mod = this.getModifierNumber(monster.stats.wisdom);
				break;
			case "Charisma":
				mod = this.getModifierNumber(monster.stats.charisma);
				break;
		}

		return mod;
	}

	private random(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
}
