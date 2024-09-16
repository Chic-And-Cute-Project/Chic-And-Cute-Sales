import {Component, Input, OnInit} from '@angular/core';
import {CloseSalesDay} from "../../../models/close-sales-day";
import {CloseSalesDayService} from "../../../services/close-sales-day/close-sales-day.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DatePipe} from "@angular/common";
import {CloseSalesDayApiResponse} from "../../../models/apiResponses/closeSalesDayApiResponse";

@Component({
  selector: 'app-documents-admin',
  templateUrl: './documents-admin.component.html',
  styleUrl: './documents-admin.component.css'
})
export class DocumentsAdminComponent implements OnInit{
    @Input() role: string;
    sedeSelected: string;
    minDate: Date;
    maxDate: Date;
    closeSalesDay: CloseSalesDay;
    sedes: Array<string>;
    closeSalesDays: Array<CloseSalesDay>;

    constructor(private closeSalesDayService: CloseSalesDayService, private snackBar: MatSnackBar,
                public datePipe: DatePipe) {
        this.role = "";
        this.sedeSelected = "Molina Plaza";
        this.minDate = new Date();
        this.minDate.setHours(0,0,0,0);
        this.maxDate = new Date();
        this.maxDate.setHours(0,0,0,0);
        this.maxDate.setDate(this.minDate.getDate() + 1);
        this.closeSalesDay = {show: false} as CloseSalesDay;
        this.closeSalesDays = [];
        this.sedes = ["Molina Plaza", "Open Plaza", "Web"];
    }

    ngOnInit(): void {
        this.refreshDocuments();
    }

    refreshDocuments() {
        if (this.minDate < this.maxDate) {
            this.snackBar.open("Buscando documentos");
            this.closeSalesDayService.getBySede(this.sedeSelected, this.minDate, this.maxDate).subscribe({
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
