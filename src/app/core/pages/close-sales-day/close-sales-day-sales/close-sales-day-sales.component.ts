import {Component, Input, OnInit} from '@angular/core';
import {SaleService} from "../../../services/sale/sale.service";
import {SaleApiResponse} from "../../../models/apiResponses/saleApiResponse";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CloseSalesDay} from "../../../models/close-sales-day";
import {CloseSalesDayService} from "../../../services/close-sales-day/close-sales-day.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-close-sales-day-sales',
  templateUrl: './close-sales-day-sales.component.html',
  styleUrl: './close-sales-day-sales.component.css'
})
export class CloseSalesDaySalesComponent implements OnInit{
    @Input() role: string;
    totalAmount: number;
    date: Date;
    closeSalesDay: CloseSalesDay;

    constructor(private salesService: SaleService, private closeSalesDayService: CloseSalesDayService,
                private snackBar: MatSnackBar, private router: Router) {
        this.role = "";
        this.totalAmount = 0;
        this.date = new Date();
        this.date.setHours(0,0,0,0);
        this.closeSalesDay = {} as CloseSalesDay;
    }

    ngOnInit(): void {
        this.refreshSales();
    }

    refreshSales() {
        this.salesService.getSalesByDate(this.date).subscribe({
            next: (response: SaleApiResponse) => {
                this.snackBar.dismiss();
                this.closeSalesDay.sales = response.sales;
                this.closeSalesDay.cashAmount = response.cash;
                this.closeSalesDay.cardAmount = response.card;
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
}
