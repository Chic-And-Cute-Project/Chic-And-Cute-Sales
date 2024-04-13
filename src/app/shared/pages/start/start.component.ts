import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {UserService} from "../../../core/services/user/user.service";
import {Router} from "@angular/router";
import {UserApiResponse} from "../../../security/models/apiResponses/userApiResponse";

@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrl: './start.component.css'
})
export class StartComponent implements OnInit {

    constructor(private authService: AuthService, private userService: UserService,
                private router: Router) {}

    ngOnInit(): void {
        if (this.authService.checkLogin()) {
            this.userService.getObject().subscribe({
                next: (response: UserApiResponse) => {
                    this.router.navigate(['/home', response.user.role]).then();
                },
                error: () => {
                    this.router.navigate(['login']).then();
                    this.authService.logout();
                }
            });
        } else {
            this.router.navigate(['login']).then();
        }
    }
}
