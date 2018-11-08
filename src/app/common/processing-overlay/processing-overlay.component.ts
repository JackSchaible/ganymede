import { Component, Input, OnDestroy } from "@angular/core";

@Component({
	selector: "gm-processing-overlay",
	templateUrl: "./processing-overlay.component.html",
	styleUrls: ["./processing-overlay.component.scss"]
})
export class ProcessingOverlayComponent implements OnDestroy {
	@Input()
	set isActive(value: boolean) {
		if (value) this.active = value;
		else
			this.switchTimer = setTimeout(() => {
				this.active = value;
			}, this.switchDelay);
	}

	get isActive(): boolean {
		return this.active;
	}

	private active: boolean;

	@Input()
	public message: string;

	private switchDelay: number = 2000;
	private switchTimer;

	constructor() {}

	ngOnDestroy(): void {
		clearTimeout(this.switchTimer);
	}
}
