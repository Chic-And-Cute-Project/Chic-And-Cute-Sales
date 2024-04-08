import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../../shared/services/auth/auth.service";
import {Router} from "@angular/router";
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
    user: User;

    constructor(private userService: UserService, private authService: AuthService,
                private snackBar: MatSnackBar, private router: Router) {
        this.role = "";
        this.user = { name: "Nombre", lastName : "Apellido", sede: "Administración" } as User;
    }

    ngOnInit(): void {
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
        this.router.navigate(['/login']).then();
    }
}
