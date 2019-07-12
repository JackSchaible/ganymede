import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CastingTimeComponent } from "./casting-time/casting-time.component";
import { SpellComponentsComponent } from "./spell-components/spell-components.component";
import { SpellDurationComponent } from "./spell-duration/spell-duration.component";
import { SpellRangeComponent } from "./spell-range/spell-range.component";
import { SpellListComponent } from "./spell-list/spell-list.component";
import { SpellEditComponent } from "./spell-edit/spell-edit.component";
import { SpellRoutingModule } from "./spell-routing.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonModule } from "@angular/material/button";
import { GmCommonModule } from "src/app/common/gm-common.module";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule } from "src/app/forms/forms.module";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NgReduxFormModule } from "@angular-redux/form";

@NgModule({
	declarations: [
		CastingTimeComponent,
		SpellComponentsComponent,
		SpellDurationComponent,
		SpellRangeComponent,
		SpellListComponent,
		SpellEditComponent
	],
	imports: [
		CommonModule,
		SpellRoutingModule,
		MatExpansionModule,
		MatButtonModule,
		GmCommonModule,
		MatCardModule,
		MatInputModule,
		MatSelectModule,
		FormsModule,
		MatSnackBarModule,
		NgReduxFormModule
	]
})
export class SpellModule {}
