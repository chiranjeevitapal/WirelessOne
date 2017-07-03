import { Component, OnInit  } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
import { Lab } from './lab.interface';
import {FilterPipe} from '../pipes/search-filter.pipe';

@Component({
    styleUrls: ['./home.component.css', '../sb-admin-2.css'],
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    errorMessage: string;
    public labForm: FormGroup; // our form model
    labs: any[];
    public filterText: string;
    public filterPlaceholder: string;
    public filterInput = new FormControl();
    constructor(private router: Router, private homeService: HomeService, private _fb: FormBuilder) {
        this.labs = [];
    }

    public ngOnInit(): void {
        //this.enableFilter = true;
        this.filterText = "";
        this.filterPlaceholder = "Search by Lab/Building/Location";
        this.filterInput
            .valueChanges
            .debounceTime(200)
            .subscribe(term => {
                this.filterText = term;
                //console.log(term);
            });
        this.labForm = this._fb.group({
            lab_id: ['', Validators.required],
            building_id: ['', Validators.required],
            location: ['', Validators.required]
        })
        this.fetchLabsList();
    }

    fetchLabsList() {
        this.homeService.fetchLabsList()
            .subscribe(
            data => {
                this.labs = data;
            },
            error => this.errorMessage = <any>error);
    }
    //Method to fetch lab details
    fetchBenches(labId) {
        this.router.navigate(['/benches', labId]);
    }

    //Method to add a new lab into DB
    addLab(model: Lab, isValid: boolean) {
        if (isValid != undefined && isValid) {
            this.homeService.addLab(model)
                .subscribe(
                data => {
                    location.reload();
                },
                error => {
                    this.errorMessage = <any>error;
                });
        }
    }
}
