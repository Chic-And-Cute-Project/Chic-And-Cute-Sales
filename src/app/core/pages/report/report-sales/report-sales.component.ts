import {Component, Input, OnInit} from '@angular/core';
import {SaleApiResponse} from "../../../models/apiResponses/saleApiResponse";
import {SaleService} from "../../../services/sale/sale.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SaleDetail} from "../../../models/saleDetail";

@Component({
  selector: 'app-report-sales',
  templateUrl: './report-sales.component.html',
  styleUrl: './report-sales.component.css'
})
export class ReportSalesComponent implements OnInit {
    @Input() role: string;
    cashAmount: number;
    cardAmount: number;
    totalAmount: number;
    minDate: Date;
    maxDate: Date;
    saleDetails: Array<SaleDetail>;

    constructor(private salesService: SaleService, private snackBar: MatSnackBar) {
        this.role = "";
        this.cashAmount = 0;
        this.cardAmount = 0;
        this.totalAmount = 0;
        this.minDate = new Date();
        this.minDate.setHours(0,0,0,0);
        this.maxDate = new Date();
        this.maxDate.setHours(0,0,0,0);
        this.maxDate.setDate(this.minDate.getDate() + 1);
        this.saleDetails = [];
    }

    ngOnInit(): void {
        this.refreshSales();
    }

    refreshSales() {
        if (this.minDate < this.maxDate) {
            this.snackBar.open("Buscando ventas");
            this.salesService.getByMyInfo(this.minDate, this.maxDate).subscribe({
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
