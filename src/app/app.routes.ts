import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { inscriptionsRoutes } from '@inscriptions/inscriptions.routes';
import { exportRoutes } from './modules/content/components/export/export.routes';
import { activitiesRoutes } from '@activities/activities.routes';
import { usersRoutes } from '@users/users-routes';

export const routes: Routes = [
	{ path: '', redirectTo: "/inscriptions", pathMatch: "full" },
	...inscriptionsRoutes,
	...exportRoutes,
	...activitiesRoutes,
	...usersRoutes,
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
