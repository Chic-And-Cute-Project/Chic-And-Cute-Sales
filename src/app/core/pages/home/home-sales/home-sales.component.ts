import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../../shared/services/auth/auth.service";
import {Router} from "@angular/router";
import {User} from "../../../../security/models/user";
import {UserApiResponse} from "../../../../security/models/apiResponses/userApiResponse";
import {UserService} from "../../../services/user/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-home-sales',
    templateUrl: './home-sales.component.html',
    styleUrl: './home-sales.component.css'
})
export class HomeSalesComponent implements OnInit{
    @Input() role: string;
    hasSede: boolean;
    user: User;

    constructor(private userService: UserService, private authService: AuthService,
                private snackBar: MatSnackBar, private router: Router) {
        this.role = "";
        this.hasSede = false;
        this.user = { name: "Nombre", lastName : "Apellido", sede: "Sin sede asignada" } as User;
    }

    ngOnInit(): void {
        this.userService.getObject().subscribe({
            next: (response: UserApiResponse) => {
                this.user = response.user;
                this.hasSede = this.user.sede != "Sin sede asignada";
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    signOut() {
        this.authService.logout();
        this.router.navigate(['/login']).then();
    }
}
