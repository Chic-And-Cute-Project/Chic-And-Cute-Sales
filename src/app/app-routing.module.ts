import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "./shared/pages/page-not-found/page-not-found.component";
import {LogInComponent} from "./security/pages/log-in/log-in.component";
import {navigatorHomeGuard} from "./shared/services/navigator-home-guard/navigator-home.guard";
import {navigatorLoginGuard} from "./shared/services/navigator-login-guard/navigator-login.guard";
import {HomePrincipalComponent} from "./core/pages/home/home-principal/home-principal.component";
import {SalesSedeComponent} from "./admin/pages/sales-sede/sales-sede.component";
import {ProductsDiscountsComponent} from "./admin/pages/products-discounts/products-discounts.component";
import {StartComponent} from "./shared/pages/start/start.component";
import {StockPrincipalComponent} from "./core/pages/stock/stock-principal/stock-principal.component";

const routes: Routes = [
    { path: 'start', component: StartComponent},
    { path: 'login', component: LogInComponent, canActivate: [navigatorLoginGuard]},
    { path: 'home/:role', component: HomePrincipalComponent, canActivate: [navigatorHomeGuard]},
    { path: 'sales-sede/:role', component: SalesSedeComponent},
    { path: 'products-discounts/:role', component: ProductsDiscountsComponent},
    { path: 'stock/:role', component: StockPrincipalComponent},
    { path: '', redirectTo: 'start', pathMatch: 'full'},
    { path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
