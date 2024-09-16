import {Component, Input, OnInit} from '@angular/core';
import {CloseSalesDay} from "../../../models/close-sales-day";
import {SaleApiResponse} from "../../../models/apiResponses/saleApiResponse";
import {SaleService} from "../../../services/sale/sale.service";
import {CloseSalesDayService} from "../../../services/close-sales-day/close-sales-day.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-close-sales-day-admin',
  templateUrl: './close-sales-day-admin.component.html',
  styleUrl: './close-sales-day-admin.component.css'
})
export class CloseSalesDayAdminComponent implements OnInit {
    @Input() role: string;
    totalAmount: number;
    date: Date;
    closeSalesDay: CloseSalesDay;
    sedes: Array<string>;

    constructor(private salesService: SaleService, private closeSalesDayService: CloseSalesDayService,
                private snackBar: MatSnackBar, private router: Router) {
        this.role = "";
        this.totalAmount = 0;
        this.date = new Date();
        this.date.setHours(0,0,0,0);
        this.closeSalesDay = { sede: "Molina Plaza" } as CloseSalesDay;
        this.sedes = ["Molina Plaza", "Open Plaza", "Web"];
    }

    ngOnInit(): void {
        this.refreshSales();
    }

    refreshSales() {
        this.salesService.getSalesByDateAndSede(this.closeSalesDay.sede, this.date).subscribe({
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
        this.closeSalesDayService.createAdmin(this.closeSalesDay).subscribe({
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
