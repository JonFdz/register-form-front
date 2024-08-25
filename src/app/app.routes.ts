import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { inscriptionsRoutes } from '@inscriptions/inscriptions.routes';
import { exportRoutes } from './modules/content/components/export/export.routes';

export const routes: Routes = [
	{ path: '', redirectTo: "/inscriptions", pathMatch: "full" },
	...inscriptionsRoutes,
	...exportRoutes,
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
