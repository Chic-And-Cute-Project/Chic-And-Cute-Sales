import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {PageNotFoundComponent} from "./shared/pages/page-not-found/page-not-found.component";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import { LogInComponent } from './security/pages/log-in/log-in.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { HomeSalesComponent } from './core/pages/home/home-sales/home-sales.component';
import { HomePrincipalComponent } from './core/pages/home/home-principal/home-principal.component';
import { HomeAdminComponent } from './core/pages/home/home-admin/home-admin.component';
import { UsersSedeComponent } from './admin/pages/users-sede/users-sede.component';
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import { AddUserDialogComponent } from './admin/dialogs/add-user/add-user-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { ProductsDiscountsComponent } from './admin/pages/products-discounts/products-discounts.component';
import {AddProductDialogComponent} from "./admin/dialogs/add-product/add-product-dialog.component";
import {AddDiscountDialogComponent} from "./admin/dialogs/add-discount/add-discount-dialog.component";
import { StockPrincipalComponent } from './core/pages/stock/stock-principal/stock-principal.component';
import { StockAdminComponent } from './core/pages/stock/stock-admin/stock-admin.component';
import { StockSalesComponent } from './core/pages/stock/stock-sales/stock-sales.component';
import {MatTableModule} from "@angular/material/table";
import {EditInventoryDialogComponent} from "./core/dialogs/edit-inventory/edit-inventory-dialog.component";
import {DatePipe, NgOptimizedImage} from "@angular/common";
import { RemissionGuideComponent } from './admin/pages/remission-guide/remission-guide.component';
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { StockReceptionPrincipalComponent } from './core/pages/stock-reception/stock-reception-principal/stock-reception-principal.component';
import { StockReceptionAdminComponent } from './core/pages/stock-reception/stock-reception-admin/stock-reception-admin.component';
import { StockReceptionSalesComponent } from './core/pages/stock-reception/stock-reception-sales/stock-reception-sales.component';
import { SalesPrincipalComponent } from './core/pages/sales/sales-principal/sales-principal.component';
import { SalesSalesComponent } from './core/pages/sales/sales-sales/sales-sales.component';
import { SalesAdminComponent } from './core/pages/sales/sales-admin/sales-admin.component';
import { ReportPrincipalComponent } from './core/pages/report/report-principal/report-principal.component';
import { ReportAdminComponent } from './core/pages/report/report-admin/report-admin.component';
import { ReportSalesComponent } from './core/pages/report/report-sales/report-sales.component';
import { CloseSalesDayPrincipalComponent } from './core/pages/close-sales-day/close-sales-day-principal/close-sales-day-principal.component';
import { CloseSalesDayAdminComponent } from './core/pages/close-sales-day/close-sales-day-admin/close-sales-day-admin.component';
import { CloseSalesDaySalesComponent } from './core/pages/close-sales-day/close-sales-day-sales/close-sales-day-sales.component';
import { DocumentsPrincipalComponent } from './core/pages/documents/documents-principal/documents-principal.component';
import { DocumentsAdminComponent } from './core/pages/documents/documents-admin/documents-admin.component';
import { DocumentsSalesComponent } from './core/pages/documents/documents-sales/documents-sales.component';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        LogInComponent,
        HomeSalesComponent,
        HomePrincipalComponent,
        HomeAdminComponent,
        UsersSedeComponent,
        AddUserDialogComponent,
        ProductsDiscountsComponent,
        AddProductDialogComponent,
        AddDiscountDialogComponent,
        StockPrincipalComponent,
        StockAdminComponent,
        StockSalesComponent,
        EditInventoryDialogComponent,
        RemissionGuideComponent,
        StockReceptionPrincipalComponent,
        StockReceptionAdminComponent,
        StockReceptionSalesComponent,
        SalesPrincipalComponent,
        SalesSalesComponent,
        SalesAdminComponent,
        ReportPrincipalComponent,
        ReportAdminComponent,
        ReportSalesComponent,
        CloseSalesDayPrincipalComponent,
        CloseSalesDayAdminComponent,
        CloseSalesDaySalesComponent,
        DocumentsPrincipalComponent,
        DocumentsAdminComponent,
        DocumentsSalesComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        MatButtonModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatSelectModule,
        MatOptionModule,
        MatDialogModule,
        MatTableModule,
        NgOptimizedImage,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    providers: [
        provideAnimationsAsync(),
        DatePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
