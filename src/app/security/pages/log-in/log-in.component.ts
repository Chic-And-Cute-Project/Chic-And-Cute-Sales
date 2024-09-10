import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {LogInService} from "../../services/log-in/log-in.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserApiResponse} from "../../models/apiResponses/userApiResponse";
import {Router} from "@angular/router";
import {CommunicationService} from "../../../shared/services/communicacion/communication.service";
import {UserService} from "../../../core/services/user/user.service";

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
    styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit {
    user: User;

    constructor(private logInService: LogInService, private userService: UserService,
                private communicationService: CommunicationService, private router: Router,
                private snackBar: MatSnackBar) {
        this.user = {} as User;
    }

    ngOnInit(): void {
        this.communicationService.emitTitleChange({ name: "", sede: "" });
        if (localStorage.getItem('token')) {
            this.userService.getObject().subscribe({
                next: (response: UserApiResponse) => {
                    this.user = response.user;
                    this.router.navigate(['/home', this.user.role]).then();
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                    if (e.message == "Vuelva a iniciar sesión") {
                        localStorage.clear();
                        this.router.navigate(['/login']).then();
                    }
                }
            });
        }
    }

    onSubmit() {
        this.snackBar.open("Iniciando sesión");
        this.logInService.logIn(this.user).subscribe({
            next: (response: UserApiResponse) => {
                this.snackBar.dismiss();
                localStorage.setItem('token', response.token);

                this.router.navigate(['/home', response.role]).then();
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }
}
