import {Component, Input} from '@angular/core';
import {AuthService} from "../../../shared/services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-home-admin',
    templateUrl: './home-admin.component.html',
    styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent {
    @Input() role: string;

    constructor(private authService: AuthService, private router: Router) {
        this.role = "";
    }

    signOut() {
        this.authService.logout();
        this.router.navigate(['/login']).then();
    }
}
