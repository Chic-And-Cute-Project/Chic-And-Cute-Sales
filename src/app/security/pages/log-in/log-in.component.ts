import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {LogInService} from "../../services/log-in/log-in.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserApiResponse} from "../../models/apiResponses/userApiResponse";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {Router} from "@angular/router";
import {CommunicationService} from "../../../shared/services/communicacion/communication.service";

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
    styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit{
    user: User;

    constructor(private logInService: LogInService, private authService: AuthService,
                private communicationService: CommunicationService, private router: Router,
                private snackBar: MatSnackBar) {
        this.user = {} as User;
    }

    ngOnInit(): void {
        this.communicationService.emitTitleChange({ name: "", sede: "" });
    }

    onSubmit() {
        this.snackBar.open("Iniciando sesión");
        this.logInService.logIn(this.user).subscribe({
            next: (response: UserApiResponse) => {
                this.snackBar.dismiss();
                this.authService.login(response.token);

                this.router.navigate(['/home', response.user.role]).then();
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }
}
