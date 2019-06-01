import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
import SnackbarModel from '../models/snackbarModel';

@Component({
  selector: 'gm-snackbar',
  template: `
    <div [class]="classString">
      <p class="align-self-center"><i [class]="icon"></i></p>
      <p class="ml-2">{{ data.message }}</p>
    </div>`
})
export class SnackbarComponent {
  public classString: string;
  public icon: string;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarModel
  ) {
    this.classString = `d-flex ${data.textClass}`;
    this.icon = `fas fa-2x fa-${data.icon}`;
   }
}
