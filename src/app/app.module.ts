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
import { HomeSalesComponent } from './core/home/home-sales/home-sales.component';
import { HomePrincipalComponent } from './core/home/home-principal/home-principal.component';
import { HomeAdminComponent } from './core/home/home-admin/home-admin.component';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        LogInComponent,
        HomeSalesComponent,
        HomePrincipalComponent,
        HomeAdminComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        MatButtonModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule
    ],
    providers: [
        provideAnimationsAsync()
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
