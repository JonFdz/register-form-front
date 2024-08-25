import { Routes } from '@angular/router';
import { ActivitiesFormComponent } from './activities-form/activities-form.component';
import { ActivitiesListComponent } from './activities-list/activities-list.component';


export const activitiesRoutes: Routes = [
	{ path: 'activities', component: ActivitiesListComponent },
	{ path: 'activities/register', component: ActivitiesFormComponent },
];