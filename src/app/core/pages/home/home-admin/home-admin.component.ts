import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../../shared/services/auth/auth.service";
import {UserService} from "../../../services/user/user.service";
import {UserApiResponse} from "../../../../security/models/apiResponses/userApiResponse";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../../../../security/models/user";

@Component({
    selector: 'app-home-admin',
    templateUrl: './home-admin.component.html',
    styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent implements OnInit{
    @Input() role: string;
    url: string;
    user: User;

    constructor(private userService: UserService, private authService: AuthService,
                private snackBar: MatSnackBar) {
        this.role = "";
        this.url = "";
        this.user = { name: "Nombre", lastName : "Apellido", sede: "Administración" } as User;
    }

    ngOnInit(): void {
        this.url = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/login';
        this.userService.getObject().subscribe({
            next: (response: UserApiResponse) => {
                this.user = response.user;
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
