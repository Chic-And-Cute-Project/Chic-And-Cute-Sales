import {Component, Input, OnInit} from '@angular/core';
import {SaleDetail} from "../../../models/saleDetail";
import {SaleApiResponse} from "../../../models/apiResponses/saleApiResponse";
import {SaleService} from "../../../services/sale/sale.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../../../../security/models/user";
import {UserApiResponse} from "../../../../security/models/apiResponses/userApiResponse";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-report-admin',
  templateUrl: './report-admin.component.html',
  styleUrl: './report-admin.component.css'
})
export class ReportAdminComponent implements OnInit{
    @Input() role: string;
    sedeSelected: string;
    cashAmount: number;
    cardAmount: number;
    totalAmount: number;
    minDate: Date;
    maxDate: Date;
    user: User;
    saleDetails: Array<SaleDetail>;
    users: Array<User>;
    sedes: Array<string>;

    constructor(private salesService: SaleService, private userService: UserService,
                private snackBar: MatSnackBar) {
        this.role = "";
        this.sedeSelected = "Molina Plaza";
        this.cashAmount = 0;
        this.cardAmount = 0;
        this.totalAmount = 0;
        this.minDate = new Date();
        this.minDate.setHours(0,0,0,0);
        this.maxDate = new Date();
        this.maxDate.setHours(0,0,0,0);
        this.maxDate.setDate(this.minDate.getDate() + 1);
        this.user = {} as User;
        this.saleDetails = [];
        this.users = [];
        this.sedes = ["Molina Plaza", "Open Plaza", "Web"];
    }

    ngOnInit(): void {
        this.userService.getAllSales().subscribe({
            next: (response: UserApiResponse) => {
                this.users = response.users.filter( user => user.sede != "Sin sede asignada");
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    refreshSales() {
        if (this.minDate < this.maxDate) {
            this.snackBar.open("Buscando ventas");
            this.salesService.getByInfoFromAdmin(this.user._id, this.sedeSelected, this.minDate, this.maxDate).subscribe({
                next: (response: SaleApiResponse) => {
                    this.snackBar.dismiss();
                    this.saleDetails = response.saleDetails;
                    this.cardAmount = response.card;
                    this.cashAmount = response.cash;
                    this.totalAmount = this.cardAmount + this.cashAmount;
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                }
            });
        } else {
            this.snackBar.open("Fechas incorrectas", "Entendido", {duration: 2000});
        }
    }

    searchSales() {
        if (this.minDate <= this.maxDate) {
            this.refreshSales();
        } else {
            this.snackBar.open("Error con las fechas ingresadas", "Entendido", {duration: 2000});
        }
    }
}
