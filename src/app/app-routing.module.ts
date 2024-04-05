import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "./shared/pages/page-not-found/page-not-found.component";
import {LogInComponent} from "./security/pages/log-in/log-in.component";
import {navigatorHomeGuard} from "./shared/services/navigator-home-guard/navigator-home.guard";
import {navigatorLoginGuard} from "./shared/services/navigator-login-guard/navigator-login.guard";
import {HomePrincipalComponent} from "./core/home/home-principal/home-principal.component";

const routes: Routes = [
    { path: 'login', component: LogInComponent, canActivate: [navigatorLoginGuard]},
    { path: 'home/:role', component: HomePrincipalComponent, canActivate: [navigatorHomeGuard]},
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
