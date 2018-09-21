import { Injectable } from "@angular/core";
import Fraction from "../common/fraction";
import Alignment from "../common/models/alignment";
import { elementStart } from "@angular/core/src/render3/instructions";

@Injectable({
	providedIn: "root"
})
export class CalculatorService {
	constructor() {}

	public getModifier(score: number): string {
		const mod = Math.floor((score - 10) / 2);
		return `${score} (${mod < 0 ? "" : "+"}${mod})`;
	}

	public getCrString(challenge: number) {
		if (challenge < 1 && challenge > 0)
			return this.RealToFraction(challenge, 0.0000001).toString();
		else return challenge.toString();
	}

	private RealToFraction(value: number, accuracy: number): Fraction {
		if (accuracy <= 0.0 || accuracy >= 1.0)
			throw new Error("Must be > 0 and < 1.");

		let sign: number = Math.sign(value);

		if (sign == -1) {
			value = Math.abs(value);
		}

		// Accuracy is the maximum relative error; convert to absolute maxError
		let maxError = sign == 0 ? accuracy : value * accuracy;

		let n: number = Math.floor(value);
		value -= n;

		if (value < maxError) return new Fraction(sign * n, 1);

		if (1 - maxError < value) return new Fraction(sign * (n + 1), 1);

		// The lower fraction is 0/1
		let lower_n: number = 0;
		let lower_d: number = 1;

		// The upper fraction is 1/1
		let upper_n: number = 1;
		let upper_d: number = 1;

		while (true) {
			// The middle fraction is (lower_n + upper_n) / (lower_d + upper_d)
			let middle_n: number = lower_n + upper_n;
			let middle_d: number = lower_d + upper_d;

			if (middle_d * (value + maxError) < middle_n) {
				// real + error < middle : middle is our new upper
				upper_n = middle_n;
				upper_d = middle_d;
			} else if (middle_n < (value - maxError) * middle_d) {
				// middle < real - error : middle is our new lower
				lower_n = middle_n;
				lower_d = middle_d;
			} else {
				// Middle is our best fraction
				return new Fraction((n * middle_d + middle_n) * sign, middle_d);
			}
		}
	}

	public CrToXP(cr: number): number {
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

	public GetAlignmentString(alignment: Alignment): string {
		let results = [];
		console.log(this);

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
}
