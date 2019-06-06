import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CampaignListComponent } from "./campaign-list/campaign-list.component";
import { AuthGuard } from "../guards/auth.guard";
import { CampaignEditComponent } from "./campaign-edit/campaign-edit.component";

const routes: Routes = [
	{
		path: "campaigns",
		component: CampaignListComponent,
		data: { animation: "campaigns" },
		canActivate: [AuthGuard]
	},
	{
		path: "campaign/:id",
		component: CampaignEditComponent,
		data: { animation: "campaigns" },
		canActivate: [AuthGuard]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CampaignRoutingModule {}
