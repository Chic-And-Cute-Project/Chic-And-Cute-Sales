import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../core/services/user/user.service";
import {UserApiResponse} from "../../../security/models/apiResponses/userApiResponse";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../../../security/models/user";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddUserDialogComponent} from "../../dialogs/add-user/add-user-dialog.component";

@Component({
    selector: 'app-users-sede',
    templateUrl: './users-sede.component.html',
    styleUrl: './users-sede.component.css'
})
export class UsersSedeComponent implements OnInit{
    userName: string;
    saveButtonDisabled: boolean;
    user: User;
    users: Array<User>;
    usersInactive: Array<User>;

    constructor(private userService: UserService, private snackBar: MatSnackBar,
                private dialog: MatDialog) {
        this.userName = "";
        this.saveButtonDisabled = true;
        this.user = { name: "Nombre", lastName: "Apellido", username: "Usuario", sede: "Sin sede asignada" } as User;
        this.users = [];
        this.usersInactive = [];
    }

    ngOnInit(): void {
        this.refreshUsers();
    }

    refreshUsers(): void {
        this.userService.getAllSales().subscribe({
            next: (response: UserApiResponse) => {
                this.snackBar.dismiss();
                this.users = response.users.filter( user => user.sede != "Sin sede asignada");
                this.usersInactive = response.users.filter( user => user.sede == "Sin sede asignada");
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
            if (result) {
                this.snackBar.open("Creando usuario");
                this.userService.create(result.user).subscribe({
                    next: (response: UserApiResponse) => {
                        this.snackBar.dismiss();
                        this.usersInactive.push(response.user);
                    },
                    error: (e) => {
                        this.snackBar.open(e.message, "Entendido", {duration: 2000});
                    }
                });
            }
        });
    }

    updateUser() {
        this.snackBar.open("Actualizando usuario");
        this.userService.update(this.user).subscribe({
            next: () => {
                this.snackBar.dismiss();
                this.refreshUsers();
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    searchSale() {
        if (this.userName != "") {
            this.snackBar.open("Buscando usuarios");
            this.userService.searchUsers(this.userName).subscribe({
                next: response => {
                    this.snackBar.dismiss();
                    this.users = response.users.filter( user => user.sede != "Sin sede asignada");
                    this.usersInactive = response.users.filter( user => user.sede == "Sin sede asignada");
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", { duration: 2000});
                }
            });
        } else {
            this.snackBar.open("Escribe un nombre", "Entendido", { duration: 2000});
        }
    }

    reloadSearch() {
        this.userName = "";
        this.snackBar.open("Reiniciando búsqueda");
        this.refreshUsers();
    }
}
