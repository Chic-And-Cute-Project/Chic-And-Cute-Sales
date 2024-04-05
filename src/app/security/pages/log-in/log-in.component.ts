import { Component } from '@angular/core';
import {User} from "../../models/user";
import {LogInService} from "../../services/log-in/log-in.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserApiResponse} from "../../models/apiResponses/userApiResponse";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
    styleUrl: './log-in.component.css'
})
export class LogInComponent {
    user: User;

    constructor(private logInService: LogInService, private authService: AuthService,
                private router: Router, private snackBar: MatSnackBar) {
        this.user = {} as User;
    }

    onSubmit() {
        this.logInService.logIn(this.user).subscribe({
            next: (response: UserApiResponse) => {
                this.authService.login(response.token);

                this.router.navigate(['/home', response.user.role]).then();
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }
}
