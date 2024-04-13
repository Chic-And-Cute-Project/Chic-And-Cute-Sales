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
import { SalesSedeComponent } from './admin/pages/sales-sede/sales-sede.component';
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import { AddUserDialogComponent } from './admin/dialogs/add-user/add-user-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { ProductsDiscountsComponent } from './admin/pages/products-discounts/products-discounts.component';
import {AddProductDialogComponent} from "./admin/dialogs/add-product/add-product-dialog.component";
import {AddDiscountDialogComponent} from "./admin/dialogs/add-discount/add-discount-dialog.component";
import { StartComponent } from './shared/pages/start/start.component';
import { StockPrincipalComponent } from './core/pages/stock/stock-principal/stock-principal.component';
import { StockAdminComponent } from './core/pages/stock/stock-admin/stock-admin.component';
import { StockSalesComponent } from './core/pages/stock/stock-sales/stock-sales.component';
import {MatTableModule} from "@angular/material/table";
import {EditInventoryDialogComponent} from "./core/dialogs/edit-inventory/edit-inventory-dialog.component";
import {NgOptimizedImage} from "@angular/common";
import { RemissionGuideComponent } from './admin/pages/remission-guide/remission-guide.component';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        LogInComponent,
        HomeSalesComponent,
        HomePrincipalComponent,
        HomeAdminComponent,
        SalesSedeComponent,
        AddUserDialogComponent,
        ProductsDiscountsComponent,
        AddProductDialogComponent,
        AddDiscountDialogComponent,
        StartComponent,
        StockPrincipalComponent,
        StockAdminComponent,
        StockSalesComponent,
        EditInventoryDialogComponent,
        RemissionGuideComponent
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
        NgOptimizedImage
    ],
    providers: [
        provideAnimationsAsync()
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
