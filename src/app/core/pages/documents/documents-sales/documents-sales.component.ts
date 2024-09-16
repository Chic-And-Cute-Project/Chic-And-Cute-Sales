import {Component, Input, OnInit} from '@angular/core';
import {CloseSalesDay} from "../../../models/close-sales-day";
import {CloseSalesDayService} from "../../../services/close-sales-day/close-sales-day.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CloseSalesDayApiResponse} from "../../../models/apiResponses/closeSalesDayApiResponse";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-documents-sales',
  templateUrl: './documents-sales.component.html',
  styleUrl: './documents-sales.component.css'
})
export class DocumentsSalesComponent implements OnInit {
    @Input() role: string;
    minDate: Date;
    maxDate: Date;
    closeSalesDay: CloseSalesDay;
    closeSalesDays: Array<CloseSalesDay>;

    constructor(private closeSalesDayService: CloseSalesDayService, private snackBar: MatSnackBar,
                public datePipe: DatePipe) {
        this.role = "";
        this.minDate = new Date();
        this.minDate.setHours(0,0,0,0);
        this.maxDate = new Date();
        this.maxDate.setHours(0,0,0,0);
        this.maxDate.setDate(this.minDate.getDate() + 1);
        this.closeSalesDay = {show: false} as CloseSalesDay;
        this.closeSalesDays = [];
    }

    ngOnInit(): void {
        this.refreshDocuments();
    }

    refreshDocuments() {
        if (this.minDate < this.maxDate) {
            this.snackBar.open("Buscando documentos");
            this.closeSalesDayService.getByMySede(this.minDate, this.maxDate).subscribe({
                next: (response: CloseSalesDayApiResponse) => {
                    this.snackBar.dismiss();
                    this.closeSalesDays = response.closeSalesDays;
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                }
            });
        } else {
            this.snackBar.open("Fechas incorrectas", "Entendido", {duration: 2000});
        }
    }

    searchDocuments() {
        this.refreshDocuments();
        this.closeSalesDay = {show: false} as CloseSalesDay;
    }

    selectDocument(closeSalesDay: CloseSalesDay) {
        this.closeSalesDay = closeSalesDay;
        this.closeSalesDay.totalAmount = this.closeSalesDay.cashAmount + this.closeSalesDay.cardAmount;
        this.closeSalesDay.show = true;
    }
}
