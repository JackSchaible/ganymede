import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import { ModalModel } from "../models/modalModel";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import KeyboardBaseComponent from "../baseComponents/keyboardBaseComponents";
import { KeyboardService } from "src/app/services/keyboard.service";
import { ButtonModel } from "../models/buttonModel";

@Component({
	selector: "gm-modal",
	templateUrl: "./modal.component.html",
	styleUrls: ["./modal.component.scss"]
})
export class ModalComponent extends KeyboardBaseComponent
	implements OnInit, OnDestroy {
	public model: ModalModel;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: ModalModel,
		keyboardService: KeyboardService
	) {
		super(keyboardService);

		this.model = data;
	}

	public ngOnInit() {
		super.ngOnInit();

		this.model.buttons.forEach((button: ButtonModel) => {
			//this.keySubscriptions.push({});
		});
	}

	public ngOnDestroy() {
		super.ngOnDestroy();
	}
}
