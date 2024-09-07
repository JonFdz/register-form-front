import { Routes } from '@angular/router';
import { ExportComponent } from './export.component';
import { authGuard } from 'app/modules/auth/auth.guard';


export const exportRoutes: Routes = [
	{ path: 'export', component: ExportComponent, canActivate: [authGuard] },
];