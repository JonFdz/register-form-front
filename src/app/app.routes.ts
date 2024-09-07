import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { inscriptionsRoutes } from '@inscriptions/inscriptions.routes';
import { exportRoutes } from './modules/content/components/export/export.routes';
import { activitiesRoutes } from '@activities/activities.routes';
import { usersRoutes } from '@users/users-routes';
import { loginRoutes } from './modules/content/components/login/login.routes';

export const routes: Routes = [
	...inscriptionsRoutes,
	...exportRoutes,
	...activitiesRoutes,
	...usersRoutes,
	...loginRoutes,
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
