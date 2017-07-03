import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HomeComponent }      from './home/home.component';
import { routing } from './app.routing';
import { HomeService } from './home/home.service';
import { BenchService } from './details/bench.service';

import { AppComponent } from './app.component';
import {DetailsComponent} from "./details/details.component";
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ng2-bootstrap';

import {FilterPipe} from './pipes/search-filter.pipe';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing,
        Ng2TableModule,
        PaginationModule.forRoot()
    ],
    declarations: [AppComponent, HomeComponent,DetailsComponent, FilterPipe],
    providers: [HomeService, BenchService],
    bootstrap: [AppComponent],
})

export class AppModule {
}
