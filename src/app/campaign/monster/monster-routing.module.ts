import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { MonstersHomeComponent } from "./monsters-home/monsters-home.component";
import { AuthGuard } from "src/app/guards/auth.guard";

const routes: Routes = [
	{
		path: "",
		component: MonstersHomeComponent,
		canActivate: [AuthGuard],
		children: []
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MonsterRoutingModule {}
