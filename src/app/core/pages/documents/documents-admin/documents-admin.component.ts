import {Component, Input, OnInit} from '@angular/core';
import {CloseSalesDay} from "../../../models/close-sales-day";
import {CloseSalesDayService} from "../../../services/close-sales-day/close-sales-day.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DatePipe} from "@angular/common";
import {CloseSalesDayApiResponse} from "../../../models/apiResponses/closeSalesDayApiResponse";
import {UserApiResponse} from "../../../../security/models/apiResponses/userApiResponse";
import {UserService} from "../../../services/user/user.service";
import {CommunicationService} from "../../../../shared/services/communicacion/communication.service";
import {Router} from "@angular/router";

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

    constructor(private closeSalesDayService: CloseSalesDayService, private userService: UserService,
                private communicationService: CommunicationService, private snackBar: MatSnackBar,
                public datePipe: DatePipe, private router: Router) {
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
