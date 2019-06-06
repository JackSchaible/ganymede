import { Component, Inject } from "@angular/core";
import { ModalModel } from "../models/modalModel";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
	selector: "gm-modal",
	templateUrl: "./modal.component.html",
	styleUrls: ["./modal.component.scss"]
})
export class ModalComponent {
	public model: ModalModel;

	constructor(@Inject(MAT_DIALOG_DATA) public data: ModalModel) {
		this.model = data;
	}
}
