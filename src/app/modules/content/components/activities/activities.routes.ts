import { Routes } from '@angular/router';
import { ActivitiesFormComponent } from './activities-form/activities-form.component';
import { ActivitiesListComponent } from './activities-list/activities-list.component';
import { authGuard } from 'app/modules/auth/auth.guard';


export const activitiesRoutes: Routes = [
	{ path: 'activities', component: ActivitiesListComponent, canActivate: [authGuard] },
	{ path: 'activities/register', component: ActivitiesFormComponent, canActivate: [authGuard] },
	{ path: 'activities/register/:id', component: ActivitiesFormComponent, canActivate: [authGuard] },
];