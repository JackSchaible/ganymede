import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthGuard } from "src/app/guards/auth.guard";
import { MonsterListComponent } from "./components/monster-list/monster-list.component";

const routes: Routes = [
	{
		path: "",
		component: MonsterListComponent,
		canActivate: [AuthGuard],
		children: []
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MonsterRoutingModule {}
