import {Component, Input, OnInit} from '@angular/core';
import {SaleService} from "../../../services/sale/sale.service";
import {SaleApiResponse} from "../../../models/apiResponses/saleApiResponse";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CloseSalesDay} from "../../../models/close-sales-day";
import {CloseSalesDayService} from "../../../services/close-sales-day/close-sales-day.service";
import {Router} from "@angular/router";
import {UserApiResponse} from "../../../../security/models/apiResponses/userApiResponse";
import {UserService} from "../../../services/user/user.service";
import {CommunicationService} from "../../../../shared/services/communicacion/communication.service";
import * as jspdf from "jspdf";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-close-sales-day-sales',
  templateUrl: './close-sales-day-sales.component.html',
  styleUrl: './close-sales-day-sales.component.css'
})
export class CloseSalesDaySalesComponent implements OnInit{
    @Input() role: string;
    username: string;
    sedePdf: string;
    totalAmount: number;
    cardCounter: number;
    cashCounter: number;
    date: Date;
    closeSalesDay: CloseSalesDay;

    constructor(private salesService: SaleService, private closeSalesDayService: CloseSalesDayService,
                private userService: UserService, private communicationService: CommunicationService,
                private snackBar: MatSnackBar, private router: Router,
                private datePipe: DatePipe) {
        this.role = "";
        this.username = "";
        this.sedePdf = "";
        this.totalAmount = 0;
        this.cardCounter = 0;
        this.cashCounter = 0;
        this.date = new Date();
        this.date.setHours(0,0,0,0);
        this.closeSalesDay = {} as CloseSalesDay;
    }

    ngOnInit(): void {
        if (localStorage.getItem('token')) {
            this.userService.getObject().subscribe({
                next: (response: UserApiResponse) => {
                    this.communicationService.emitTitleChange({ name: response.user.name + " " + response.user.lastName, sede: response.user.sede });
                    this.username = response.user.username;
                    this.sedePdf = response.user.sede;
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
            this.snackBar.open("Vuelva a iniciar sesión", "Entendido", {duration: 2000});
            this.router.navigate(['/login']).then();
        }
        this.refreshSales();
    }

    refreshSales() {
        this.salesService.getSalesByDate(this.date).subscribe({
            next: (response: SaleApiResponse) => {
                this.snackBar.dismiss();
                this.closeSalesDay.sales = response.sales;
                this.closeSalesDay.cashAmount = response.cash;
                this.closeSalesDay.cardAmount = response.card;
                this.cashCounter = response.cashCounter;
                this.cardCounter = response.cardCounter;
                this.totalAmount = this.closeSalesDay.cashAmount + this.closeSalesDay.cardAmount;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    searchSales() {
        this.refreshSales();
    }

    saveCloseSalesDay() {
        this.snackBar.open("Creando cierre de caja", "Entendido", {duration: 2000});
        this.closeSalesDayService.createSales(this.closeSalesDay).subscribe({
            next: async () => {
                this.snackBar.dismiss();
                this.router.navigate(['/home', this.role]).then();
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    printPdf() {
        let doc = new jspdf.jsPDF({ format: "a7" });
        doc.setFontSize(10);
        doc.text(`Vendedor: ${this.username}`, 5, 10);
        doc.text(`Sede: ${this.sedePdf}`, 5, 20);
        doc.text(`Fecha de cierre: ${this.datePipe.transform(new Date(), 'dd/MM/yyyy')}`, 5, 30);
        doc.text("Reporte de ventas", 37, 40, { align: "center"});
        doc.text(`Efectivo (${this.cashCounter})\t S/.${this.closeSalesDay.cashAmount}`, 5, 50);
        doc.text(`Visa (${this.cardCounter})\t\t S/.${this.closeSalesDay.cardAmount}`, 5, 60);
        doc.text(`Total \t\t S/.${this.totalAmount}`, 5, 70);
        doc.save('Cierre de caja');
    }
}
