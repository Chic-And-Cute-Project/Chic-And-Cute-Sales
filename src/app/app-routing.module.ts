import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "./shared/pages/page-not-found/page-not-found.component";
import {LogInComponent} from "./security/pages/log-in/log-in.component";
import {HomePrincipalComponent} from "./core/pages/home/home-principal/home-principal.component";
import {UsersSedeComponent} from "./admin/pages/users-sede/users-sede.component";
import {ProductsDiscountsComponent} from "./admin/pages/products-discounts/products-discounts.component";
import {StockPrincipalComponent} from "./core/pages/stock/stock-principal/stock-principal.component";
import {RemissionGuideComponent} from "./admin/pages/remission-guide/remission-guide.component";
import {
    StockReceptionPrincipalComponent
} from "./core/pages/stock-reception/stock-reception-principal/stock-reception-principal.component";
import {SalesPrincipalComponent} from "./core/pages/sales/sales-principal/sales-principal.component";
import {ReportPrincipalComponent} from "./core/pages/report/report-principal/report-principal.component";
import {
    CloseSalesDayPrincipalComponent
} from "./core/pages/close-sales-day/close-sales-day-principal/close-sales-day-principal.component";
import {DocumentsPrincipalComponent} from "./core/pages/documents/documents-principal/documents-principal.component";

const routes: Routes = [
    { path: 'login', component: LogInComponent},
    { path: 'home/:role', component: HomePrincipalComponent},
    { path: 'users-sede', component: UsersSedeComponent},
    { path: 'products-discounts', component: ProductsDiscountsComponent},
    { path: 'stock/:role', component: StockPrincipalComponent},
    { path: 'remission-guide', component: RemissionGuideComponent},
    { path: 'stock-reception/:role', component: StockReceptionPrincipalComponent},
    { path: 'sales-point/:role', component: SalesPrincipalComponent},
    { path: 'reports/:role', component: ReportPrincipalComponent},
    { path: 'close-sales-day/:role', component: CloseSalesDayPrincipalComponent},
    { path: 'documents/:role', component: DocumentsPrincipalComponent},
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
