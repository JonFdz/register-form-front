import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { usersRoutes } from '@users/users-routes';

export const routes: Routes = [
	{ path: '', redirectTo: "/users", pathMatch: "full" },
	...usersRoutes
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
