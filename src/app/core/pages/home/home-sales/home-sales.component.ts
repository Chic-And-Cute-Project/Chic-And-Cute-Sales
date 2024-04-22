import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../../shared/services/auth/auth.service";
import {User} from "../../../../security/models/user";
import {UserApiResponse} from "../../../../security/models/apiResponses/userApiResponse";
import {UserService} from "../../../services/user/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CommunicationService} from "../../../../shared/services/communicacion/communication.service";

@Component({
    selector: 'app-home-sales',
    templateUrl: './home-sales.component.html',
    styleUrl: './home-sales.component.css'
})
export class HomeSalesComponent implements OnInit{
    @Input() role: string;
    url: string;
    hasSede: boolean;
    user: User;

    constructor(private userService: UserService, private authService: AuthService,
                private communicationService: CommunicationService, private snackBar: MatSnackBar) {
        this.role = "";
        this.url = "";
        this.hasSede = false;
        this.user = { name: "Nombre", lastName : "Apellido", sede: "Sin sede asignada" } as User;
    }

    ngOnInit(): void {
        this.url = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/login';
        this.userService.getObject().subscribe({
            next: (response: UserApiResponse) => {
                this.user = response.user;
                this.communicationService.emitTitleChange({ name: this.user.name + " " + this.user.lastName, sede: this.user.sede });
                this.hasSede = this.user.sede != "Sin sede asignada";
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    signOut() {
        this.authService.logout();
        window.location.assign(this.url);
    }
}
