import { Component, Input, OnChanges } from "@angular/core";

@Component({
  selector: "validation-message",
  templateUrl: "./validation-message.component.html",
  styleUrls: ["./validation-message.component.scss"]
})
export class ValidationMessageComponent implements OnChanges {
  @Input()
  public errors: any[];

  @Input()
  public show: boolean;

  public errorMessages: string[];

  constructor() {
    this.errorMessages = [];
  }

  ngOnChanges() {
    this.errorMessages = [];

    if (!this.errors || !this.show) return;

    if (this.errors["required"])
      this.errorMessages.push("A value must be entered.");
  }
}
