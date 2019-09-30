import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class WordService {
	public getSuffix(i: number): string {
		if (!i && i !== 0) return null;

		let result = "th";

		const str = i.toString();
		const lastChar = str[str.length - 1];

		if (i < 10 || i > 19)
			if (lastChar === "1") result = "st";
			else if (lastChar === "2") result = "nd";
			else if (lastChar === "3") result = "rd";

		return result;
	}

	public isEmptyOrSpaces(str: string): boolean {
		if (!str) return false;

		return str.match(/^ *$/) !== null;
	}
}
