import { Injectable } from "@angular/core";
import { Observable, fromEvent } from "rxjs";
import { map } from "rxjs/operators";
import { Key } from "ts-key-enum";

@Injectable({
	providedIn: "root"
})
export class KeyboardService {
	public keydown(): Observable<KeyboardEvent> {
		return fromEvent(document, "keydown").pipe(
			map(event => event as KeyboardEvent)
		);
	}
}

export class KeyboardSubscription {
	constructor(
		public key:
			| Key
			| "A"
			| "B"
			| "C"
			| "D"
			| "E"
			| "F"
			| "G"
			| "H"
			| "I"
			| "J"
			| "K"
			| "L"
			| "M"
			| "N"
			| "O"
			| "P"
			| "Q"
			| "R"
			| "s"
			| "T"
			| "U"
			| "V"
			| "W"
			| "X"
			| "Y"
			| "Z"
			| "1"
			| "2"
			| "3"
			| "4"
			| "5"
			| "6"
			| "7"
			| "8"
			| "9"
			| "0",
		public modifierKeys: Key[],
		public callbackFn: () => void
	) {}
}
