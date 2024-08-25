import { Routes } from '@angular/router';

import { UsersFormComponent } from './users-form/users-form.component';
import { UsersListComponent } from './users-list/users-list.component';

export const usersRoutes: Routes = [
	{ path: 'users', component: UsersListComponent },
	{ path: 'users/register', component: UsersFormComponent }
];
