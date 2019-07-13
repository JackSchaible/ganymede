import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AuthGuard } from "src/app/guards/auth.guard";

import { SpellListComponent } from "./spell-list/spell-list.component";
import { SpellEditComponent } from "./spell-edit/spell-edit.component";

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: "",
				component: SpellListComponent,
				canActivate: [AuthGuard]
			},
			{
				path: "edit/:spellid",
				component: SpellEditComponent,
				canActivate: [AuthGuard]
			}
		])
	],
	exports: [RouterModule]
})
export class SpellRoutingModule {}
