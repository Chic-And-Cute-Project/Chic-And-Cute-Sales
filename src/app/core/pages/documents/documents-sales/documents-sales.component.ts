import {Component, Input, OnInit} from '@angular/core';
import {CloseSalesDay} from "../../../models/close-sales-day";
import {CloseSalesDayService} from "../../../services/close-sales-day/close-sales-day.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CloseSalesDayApiResponse} from "../../../models/apiResponses/closeSalesDayApiResponse";
import {DatePipe} from "@angular/common";
import {UserApiResponse} from "../../../../security/models/apiResponses/userApiResponse";
import {UserService} from "../../../services/user/user.service";
import {CommunicationService} from "../../../../shared/services/communicacion/communication.service";
import {Router} from "@angular/router";

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

    constructor(private closeSalesDayService: CloseSalesDayService, private userService: UserService,
                private communicationService: CommunicationService, private snackBar: MatSnackBar,
                public datePipe: DatePipe, private router: Router) {
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
        if (localStorage.getItem('token')) {
            this.userService.getObject().subscribe({
                next: (response: UserApiResponse) => {
                    this.communicationService.emitTitleChange({ name: response.user.name + " " + response.user.lastName, sede: response.user.sede });
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
