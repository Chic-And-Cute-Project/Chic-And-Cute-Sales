import {ActivatedRoute, CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../auth/auth.service";

export const navigatorLoginGuard: CanActivateFn = (): boolean => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const route = inject(ActivatedRoute);

    if (!authService.checkLogin()) {
        return true;
    } else {
        router.navigate(['home', route.snapshot.params['role']]).then();
        return false;
    }
};
