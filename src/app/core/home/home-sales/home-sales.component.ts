import {Component, Input} from '@angular/core';
import {AuthService} from "../../../shared/services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-home-sales',
    templateUrl: './home-sales.component.html',
    styleUrl: './home-sales.component.css'
})
export class HomeSalesComponent {
    @Input() role: string;

    constructor(private authService: AuthService, private router: Router) {
        this.role = "";
    }

    signOut() {
        this.authService.logout();
        this.router.navigate(['/login']).then();
    }
}
