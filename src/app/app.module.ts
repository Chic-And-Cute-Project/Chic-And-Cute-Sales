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
import { AddUserDialogComponent } from './admin/dialogs/add-user-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        LogInComponent,
        HomeSalesComponent,
        HomePrincipalComponent,
        HomeAdminComponent,
        SalesSedeComponent,
        AddUserDialogComponent
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
        MatDialogModule
    ],
    providers: [
        provideAnimationsAsync()
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
