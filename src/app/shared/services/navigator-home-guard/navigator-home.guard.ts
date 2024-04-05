import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../auth/auth.service";

export const navigatorHomeGuard: CanActivateFn = (): boolean => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.checkLogin()) {
        return true;
    } else {
        router.navigate(['login']).then();
        return false;
    }
};
