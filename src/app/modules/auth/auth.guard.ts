import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard = (): boolean | UrlTree => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const state = router.routerState.snapshot;

    if (authService.isLoggedIn()) {
        return true;
    }
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};