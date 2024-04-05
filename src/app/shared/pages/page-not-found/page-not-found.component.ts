import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {
    constructor(private authService: AuthService, private router: Router) {}

    return() {
        if (this.authService.checkLogin()){
            this.router.navigate(['/home']).then();
        } else {
            this.router.navigate(['/login']).then();
        }
    }
}
