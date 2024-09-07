import { Routes } from '@angular/router';

import { UsersFormComponent } from './users-form/users-form.component';
import { UsersListComponent } from './users-list/users-list.component';
import { authGuard } from 'app/modules/auth/auth.guard';

export const usersRoutes: Routes = [
	{ path: 'users', component: UsersListComponent, canActivate: [authGuard] },
	{ path: 'users/register', component: UsersFormComponent, canActivate: [authGuard] },

];
