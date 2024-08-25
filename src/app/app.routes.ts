import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { inscriptionsRoutes } from '@inscriptions/inscriptions.routes';

export const routes: Routes = [
	{ path: '', redirectTo: "/inscriptions", pathMatch: "full" },
	...inscriptionsRoutes
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
