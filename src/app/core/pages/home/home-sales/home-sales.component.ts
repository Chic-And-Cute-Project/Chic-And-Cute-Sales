import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../security/models/user";
import {UserApiResponse} from "../../../../security/models/apiResponses/userApiResponse";
import {UserService} from "../../../services/user/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CommunicationService} from "../../../../shared/services/communicacion/communication.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-home-sales',
    templateUrl: './home-sales.component.html',
    styleUrl: './home-sales.component.css'
})
export class HomeSalesComponent implements OnInit{
    @Input() role: string;
    url: string;
    user: User;

    constructor(private userService: UserService, private communicationService: CommunicationService,
                private snackBar: MatSnackBar, private router: Router) {
        this.role = "";
        this.url = "";
        this.user = {} as User;
    }

    ngOnInit(): void {
        this.url = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/login';
        if (localStorage.getItem('token')) {
            this.userService.getObject().subscribe({
                next: (response: UserApiResponse) => {
                    this.user = response.user;
                    this.communicationService.emitTitleChange({ name: this.user.name + " " + this.user.lastName, sede: this.user.sede });
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
            this.router.navigate(['/login']).then();
        }
    }

    signOut() {
        localStorage.clear();
        window.location.assign(this.url);
    }
}
