import { Injectable } from "@angular/core";
import { Observable, fromEvent } from "rxjs";
import { map } from "rxjs/operators";

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
