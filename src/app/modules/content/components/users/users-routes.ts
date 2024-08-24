import { Routes } from '@angular/router';

import { RegisterUserComponent } from '@users/register-user/register-user.component';


export const usersRoutes: Routes = [
	{ path: 'users', component: RegisterUserComponent }
];
