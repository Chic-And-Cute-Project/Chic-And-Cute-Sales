import {Component, Input, OnInit} from '@angular/core';
import {UserApiResponse} from "../../../../security/models/apiResponses/userApiResponse";
import {SaleApiResponse} from "../../../models/apiResponses/saleApiResponse";
import {SaleService} from "../../../services/sale/sale.service";
import {UserService} from "../../../services/user/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../../../../security/models/user";
import {Sale} from "../../../models/sale";
import {SaleDetail} from "../../../models/saleDetail";
import {SaleReport} from "../../../models/saleReport";
import {Product} from "../../../../admin/models/product";

@Component({
  selector: 'app-report-sales',
  templateUrl: './report-sales.component.html',
  styleUrl: './report-sales.component.css'
})
export class ReportSalesComponent implements OnInit {
    @Input() role: string;
    minDate: Date;
    maxDate: Date;
    user: User;
    salesReport: Array<SaleReport>;
    sales: Array<Sale>;

    constructor(private salesService: SaleService, private userService: UserService,
                private snackBar: MatSnackBar) {
        this.role = "";
        this.minDate = new Date();
        this.minDate.setHours(0,0,0,0);
        this.maxDate = new Date();
        this.minDate.setHours(0,0,0,0);
        this.user = {} as User;
        this.salesReport = [];
        this.sales = [];
    }

    ngOnInit(): void {
        this.refreshSales();
        this.userService.getObject().subscribe({
            next: (response: UserApiResponse) => {
                this.user = response.user;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    refreshSales() {
        this.salesService.getByMyInfo().subscribe({
            next: (response: SaleApiResponse) => {
                this.snackBar.dismiss();
                this.salesReport = response.salesReport;
                console.log(this.salesReport);
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    searchSales() {

    }
}
