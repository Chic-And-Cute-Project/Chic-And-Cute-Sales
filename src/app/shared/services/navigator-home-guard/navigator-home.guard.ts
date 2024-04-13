import {CanActivateFn} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../auth/auth.service";

export const navigatorHomeGuard: CanActivateFn = (): boolean => {
    const authService = inject(AuthService);

    return authService.checkLogin();
};
