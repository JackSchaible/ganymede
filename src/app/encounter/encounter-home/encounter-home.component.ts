import { Component, HostListener, ViewChild, ElementRef } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

class Actor {
	public order: number;
	public name: string;
	public totalHP: number;
	public currentHP: number;
	public notes: string;
}

@Component({
	selector: "gm-encounter-home",
	templateUrl: "./encounter-home.component.html",
	styleUrls: ["./encounter-home.component.scss"]
})
export class EncounterHomeComponent {
	@ViewChild("firstInput")
	public firstInput: ElementRef;

	public actors: Array<Actor>;
	public showForm: boolean;

	public newActor: Actor;
	public error: string;

	public shift: boolean;

	constructor() {
		this.actors = new Array<Actor>();
		this.showForm = true;
		this.newActor = new Actor();
	}

	public addActor(addAnother: boolean) {
		if (
			!this.newActor.name ||
			!this.newActor.currentHP ||
			!this.newActor.totalHP
		)
			return;

		this.actors.forEach(actor => {
			if (actor.order === this.newActor.order) {
			}
		});

		this.actors.push({
			order: this.newActor.order,
			name: this.newActor.name,
			totalHP: this.newActor.totalHP,
			currentHP: this.newActor.currentHP,
			notes: this.newActor.notes
		});

		if (addAnother) {
			this.newActor.order = null;
			this.newActor.name = null;
			this.newActor.totalHP = null;
			this.newActor.currentHP = null;
			this.newActor.notes = null;

			this.setFocus();
		} else {
			this.closeForm();
		}

		this.sort();
	}

	public copy(actor: Actor): void {
		this.actors.push({
			order: actor.order,
			name: actor.name,
			currentHP: actor.currentHP,
			totalHP: actor.totalHP,
			notes: ""
		});

		this.sort();
	}

	public delete(actor: Actor): void {
		this.actors.splice(this.actors.indexOf(actor), 1);
		this.setFocus();
	}

	public cancel() {
		this.closeForm();
	}

	private setFocus(): void {
		setTimeout(() => this.firstInput.nativeElement.focus());
	}

	private closeForm(): void {
		this.clearForm();
		this.showForm = false;
	}

	private clearForm(): void {
		this.newActor.order = null;
		this.newActor.name = null;
		this.newActor.totalHP = null;
		this.newActor.currentHP = null;
		this.newActor.notes = null;
	}

	private sort() {
		this.actors.sort((a, b) => b.order - a.order);
	}

	public totalHPChanged() {
		if (!this.newActor.currentHP)
			this.newActor.currentHP = this.newActor.totalHP;
	}

	@HostListener("window:keyup", ["$event"])
	keyEvent(event: KeyboardEvent) {
		if (event.key === "Enter") this.addActor(!event.shiftKey);
	}

	public onReorder(event: CdkDragDrop<Actor[]>) {
		if (event.previousIndex === event.currentIndex) return;

		this.actors[event.previousIndex].order = this.actors[
			event.currentIndex
		].order;

		moveItemInArray(this.actors, event.previousIndex, event.currentIndex);
		this.fixOverlaps(event.previousIndex < event.currentIndex);

		this.sort();
	}

	private fixOverlaps(increment: boolean): void {
		if (increment) {
			for (let i = 0; i < this.actors.length - 1; i++)
				if (this.actors[i].order === this.actors[i + 1].order)
					this.actors[i].order++;
		} else {
			for (let i = this.actors.length - 1; i > 0; i--)
				if (this.actors[i].order === this.actors[i - 1].order)
					this.actors[i].order--;
		}
	}

	private recursiveIncrement(index: number): void {
		this.actors[index].order++;

		if (
			index > 0 &&
			this.actors[index].order === this.actors[index - 1].order
		) {
			this.recursiveDecrement(index - 1);
		}
	}

	private recursiveDecrement(index: number): void {
		this.actors[index].order--;

		if (
			index < this.actors.length - 1 &&
			this.actors[index].order === this.actors[index + 1].order
		) {
			this.recursiveDecrement(index + 1);
		}
	}
}
