import { Injectable } from "@angular/core";
import Fraction from "../common/fraction";

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
}
