import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class WordService {
	public getSuffix(i: number): string {
		var result = "th";

		const str = i.toString();
		const len = str.length;
		const lastChar = str[len];

		if (i < 10 || i > 19)
			if (lastChar === "1") result = "st";
			else if (lastChar === "2") result = "nd";

		return result;
	}
}
