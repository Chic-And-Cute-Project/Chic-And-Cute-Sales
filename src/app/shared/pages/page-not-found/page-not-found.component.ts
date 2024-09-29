import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserApiResponse} from "../../../security/models/apiResponses/userApiResponse";
import {UserService} from "../../../core/services/user/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {
    constructor(private userService: UserService, private snackBar: MatSnackBar,
                private router: Router) {}

    return() {
        if (localStorage.getItem('token')) {
            this.userService.getObject().subscribe({
                next: (response: UserApiResponse) => {
                    this.router.navigate(['/home', response.user.role]).then();
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                    if (e.message == "Vuelva a iniciar sesión") {
                        localStorage.clear();
                        this.router.navigate(['/login']).then();
                    }
                }
            });
        } else {
            this.snackBar.open("Vuelva a iniciar sesión", "Entendido", {duration: 2000});
            this.router.navigate(['/login']).then();
        }
    }
}
