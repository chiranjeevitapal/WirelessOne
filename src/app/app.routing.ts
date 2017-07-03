import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {DetailsComponent} from "./details/details.component";


const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }, {
        path: "home",
        component: HomeComponent
    }, {
        path: 'benches/:id',
        component: DetailsComponent
    }, {
        path: "**",
        redirectTo: '/home'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);