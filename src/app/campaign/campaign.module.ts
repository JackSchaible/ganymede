import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CampaignRoutingModule } from "./campaign-routing.module";
import { CampaignListComponent } from "./campaign-list/campaign-list.component";
import {
	MatExpansionModule,
	MatButtonModule,
	MatCardModule,
	MatInputModule,
	MatSelectModule,
	MatSnackBarModule
} from "@angular/material";
import { CampaignEditComponent } from "./campaign-edit/campaign-edit.component";
import { GmCommonModule } from "../common/gm-common.module";
import { FormsModule } from "@angular/forms";
import { CampaignComponent } from "./campaign/campaign.component";

@NgModule({
	imports: [
		CommonModule,
		CampaignRoutingModule,
		MatExpansionModule,
		MatButtonModule,
		GmCommonModule,
		MatCardModule,
		MatInputModule,
		MatSelectModule,
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
