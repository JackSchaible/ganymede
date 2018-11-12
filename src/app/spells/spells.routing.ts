import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { SpellsComponent } from "./spells.component";
import { SpellsListComponent } from "./spells-list/spells-list.component";
import { SpellEditComponent } from "./spell-edit/spell-edit.component";

const routes: Routes = [
	{
		path: "spells",
		component: SpellsComponent,
		children: [
			{ path: "", component: SpellsListComponent },
			{ path: "add", component: SpellEditComponent },
			{ path: "edit/:spellId", component: SpellEditComponent }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SpellsRoutingModule {}
