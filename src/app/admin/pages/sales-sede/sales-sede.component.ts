import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../core/services/user/user.service";
import {UserApiResponse} from "../../../security/models/apiResponses/userApiResponse";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../../../security/models/user";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddUserDialogComponent} from "../../dialogs/add-user/add-user-dialog.component";

@Component({
  selector: 'app-sales-sede',
  templateUrl: './sales-sede.component.html',
  styleUrl: './sales-sede.component.css'
})
export class SalesSedeComponent implements OnInit{
    role: string;
    usersEmpty: boolean;
    usersInactiveEmpty: boolean;
    saveButtonDisabled: boolean;
    user: User;
    users: Array<User>;
    usersInactive: Array<User>;
    sedes: Array<String>;

    constructor(private userService: UserService, private snackBar: MatSnackBar,
                private dialog: MatDialog, private route: ActivatedRoute) {
        this.role = this.route.snapshot.params['role'];
        this.usersEmpty = true;
        this.usersInactiveEmpty = true;
        this.saveButtonDisabled = true;
        this.user = { name: "Nombre", lastName: "Apellido", username: "Usuario", sede: "Sin sede asignada" } as User;
        this.users = [];
        this.usersInactive = [];
        this.sedes = ["Molina Plaza", "Open Plaza", "Sin sede asignada"]
    }

    ngOnInit(): void {
        this.refreshUsers();
    }

    refreshUsers(): void {
        this.userService.getAllSales().subscribe({
            next: (response: UserApiResponse) => {
                this.usersInactive = [];
                this.users = response.users.filter( (u: User) => {
                    if (u.sede != "Sin sede asignada") {
                        return u;
                    } else {
                        this.usersInactive.push(u);
                        return;
                    }
                });
                this.usersEmpty = this.users.length <= 0;
                this.usersInactiveEmpty = this.usersInactive.length <= 0;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    selectUser(user: User) {
        this.user = { ...user };
        this.saveButtonDisabled = false;
    }

    addUser() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.data = {
            user: {}
        }

        const dialogRef = this.dialog.open(AddUserDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((result: { user: User }) => {
            this.userService.create(result.user).subscribe( response => {
                this.usersInactive.push(response.user);
            });
        });
    }

    updateUser() {
        this.userService.update(this.user).subscribe(() => {
            this.refreshUsers();
        });
    }
}
