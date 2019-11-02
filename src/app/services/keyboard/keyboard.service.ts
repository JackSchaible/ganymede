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
			| "a"
			| "b"
			| "c"
			| "d"
			| "e"
			| "f"
			| "g"
			| "h"
			| "i"
			| "j"
			| "k"
			| "l"
			| "m"
			| "n"
			| "o"
			| "p"
			| "q"
			| "r"
			| "s"
			| "t"
			| "u"
			| "v"
			| "w"
			| "x"
			| "y"
			| "z"
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
