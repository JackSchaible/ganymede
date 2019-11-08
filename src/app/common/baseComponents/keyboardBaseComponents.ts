import {
	KeyboardSubscription,
	KeyboardService
} from "../../services/keyboard/keyboard.service";
import { OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Key } from "ts-key-enum";

export default abstract class KeyboardBaseComponent
	implements OnInit, OnDestroy {
	protected keySubscriptions: KeyboardSubscription[];

	private keyboardSubscription: Subscription;

	constructor(private keyboardService: KeyboardService) {
		this.keySubscriptions = [];
	}

	public ngOnInit() {
		this.keyboardSubscription = this.keyboardService
			.keydown()
			.subscribe((event: KeyboardEvent) => this.keyPressed(event));
	}

	public ngOnDestroy() {
		if (this.keyboardSubscription) this.keyboardSubscription.unsubscribe();
	}

	private keyPressed(event: KeyboardEvent) {
		let combinationFound = false;

		this.keySubscriptions.forEach((subscription: KeyboardSubscription) => {
			let modifiers = true;

			if (subscription.modifierKeys) {
				subscription.modifierKeys.forEach((key: Key) => {
					switch (key) {
						case Key.Alt:
							if (!event.altKey) modifiers = false;
							break;

						case Key.Control:
							if (!event.ctrlKey) modifiers = false;
							break;

						case Key.Shift:
							if (!event.shiftKey) modifiers = false;
							break;

						default:
							throw new Error(
								`Modifier key '${key}' is not supported.`
							);
					}
				});
			}

			if (modifiers)
				if (event.key === subscription.key) {
					subscription.callbackFn();
					combinationFound = true;
				}
		});

		if (combinationFound) event.preventDefault();
	}
}
