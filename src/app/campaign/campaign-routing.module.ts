import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CampaignListComponent } from "./components/campaign-list/campaign-list.component";
import { AuthGuard } from "../guards/auth.guard";
import { CampaignEditComponent } from "./components/campaign-edit/campaign-edit.component";
import { CampaignComponent } from "./components/campaign/campaign.component";
import { MonsterModule } from "./modules/monster/monster.module";
import { SpellModule } from "./modules/spell/spell.module";

const routes: Routes = [
	{
		path: "campaigns",
		component: CampaignListComponent,
		data: { animation: "campaigns" },
		canActivate: [AuthGuard]
	},
	{
		path: "campaigns/edit/:id",
		component: CampaignEditComponent,
		data: { animation: "campaigns" },
		canActivate: [AuthGuard]
	},
	{
		path: "campaigns/:id",
		component: CampaignComponent,
		data: { animation: "campaigns" },
		canActivate: [AuthGuard]
	},
	{
		path: "campaigns/:id/monsters",
		loadChildren: () => MonsterModule,
		canActivate: [AuthGuard]
	},
	{
		path: "campaigns/:id/spells",
		loadChildren: () => SpellModule,
		canActivate: [AuthGuard]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CampaignRoutingModule {}
