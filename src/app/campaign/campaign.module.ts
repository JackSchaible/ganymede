import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CampaignRoutingModule } from "./campaign-routing.module";
import { CampaignListComponent } from "./components/campaign-list/campaign-list.component";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { CampaignEditComponent } from "./components/campaign-edit/campaign-edit.component";
import { GmCommonModule } from "../common/gm-common.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CampaignComponent } from "./components/campaign/campaign.component";

@NgModule({
	imports: [
		CommonModule,
		GmCommonModule,
		CampaignRoutingModule,
		MatExpansionModule,
		MatButtonModule,
		GmCommonModule,
		MatCardModule,
		MatInputModule,
		MatSelectModule,
		ReactiveFormsModule,
		FormsModule,
		MatSnackBarModule
	],
	declarations: [
		CampaignListComponent,
		CampaignEditComponent,
		CampaignComponent
	]
})
export class CampaignModule {}
