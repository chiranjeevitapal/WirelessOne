import { Component, OnInit  } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { BenchService } from './bench.service';
import { ActivatedRoute } from '@angular/router';
import { Bench } from './bench.interface';

@Component({
    styleUrls: ['./details.component.css', '../sb-admin-2.css', '../oxygen.css'],
    templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {
    errorMessage: string;
    public benchForm: FormGroup; // our form model
    records: any;
    selectedLab: any;
    benches: any[];
    labid: any;
    newForm: boolean;
    selectedBench: any;
    constructor(private route: ActivatedRoute, private benchService: BenchService, private _fb: FormBuilder) {
        this.benches = [];
        this.selectedLab = {};
        this.selectedBench = {};
        this.newForm = true;
    }

    public ngOnInit(): void {
        this.benchForm = this._fb.group({
            lab_obj_id: [{ value: '', disabled: true }, Validators.required],
            bench_id: ['', Validators.required],
            poc: ['', Validators.required],
            technology: ['', Validators.required],
            type: ['', Validators.required],
            cell_id: ['', Validators.required],
            rru_output_db: ['', Validators.required],
            attenuation_db: ['', Validators.required],
            real_time_signal: ['', Validators.required],
            comments: ['', Validators.required],
            utilization: ['', Validators.required],
            enabled_date: ['', Validators.required]
        })
        this.route.params.subscribe(params => {
            this.labid = params['id'];
            this.fetchBenchesInLab(this.labid);
        });
    }

    fetchBenchesInLab(id) {
        this.benchService.fetchLabDetails(id)
            .subscribe(
            data => {
                this.selectedLab = data;
                this.benchService.fetchBenchesInLab(data._id)
                    .subscribe(
                    data => {
                        this.benches = data;
                    },
                    error => this.errorMessage = <any>error);
            },
            error => this.errorMessage = <any>error);
    }

    //Method to add a new bench for a selected lab into DB
    addBench(model: Bench, isValid: boolean, labid: string) {
        if (isValid != undefined && isValid) {
            model.lab_obj_id = labid;
            this.benchService.addBench(model)
                .subscribe(
                data => {
                    location.reload();
                },
                error => {
                    this.errorMessage = <any>error;
                });
        }
    }

    updateBench(model: any, isValid: boolean) {
        if (isValid != undefined && isValid) {
            model._id = this.selectedBench._id;
            model.lab_obj_id = this.selectedLab._id;
            this.benchService.updateBench(model)
                .subscribe(
                data => {
                    location.reload();
                },
                error => {
                    this.errorMessage = <any>error;
                });
        }
    }

    removeBench(id) {
        this.benchService.removeBench(id)
            .subscribe(
            data => {
                location.reload();
            },
            error => {
                this.errorMessage = <any>error;
            });
    }

    populateBench(id) {
        this.newForm = false;
        this.benchService.fetchBenchDetails(id)
            .subscribe(
            data => {
                this.selectedBench = data;
                this.benchForm = this._fb.group({
                    lab_obj_id: [data._id, Validators.required],
                    bench_id: [data.bench_id, Validators.required],
                    poc: [data.poc, Validators.required],
                    technology: [data.technology, Validators.required],
                    type: [data.type, Validators.required],
                    cell_id: [data.cell_id, Validators.required],
                    rru_output_db: [data.rru_output_db, Validators.required],
                    attenuation_db: [data.attenuation_db, Validators.required],
                    real_time_signal: [data.real_time_signal, Validators.required],
                    comments: [data.comments, Validators.required],
                    utilization: [data.utilization, Validators.required],
                    enabled_date: [data.enabled_date, Validators.required]
                })
            },
            error => this.errorMessage = <any>error);
    }

    clearBenchForm() {
        this.newForm = true;
        this.benchForm = this._fb.group({
            lab_obj_id: [{ value: '', disabled: true }, Validators.required],
            bench_id: ['', Validators.required],
            poc: ['', Validators.required],
            technology: ['', Validators.required],
            type: ['', Validators.required],
            cell_id: ['', Validators.required],
            rru_output_db: ['', Validators.required],
            attenuation_db: ['', Validators.required],
            real_time_signal: ['', Validators.required],
            comments: ['', Validators.required],
            utilization: ['', Validators.required],
            enabled_date: ['', Validators.required]
        })
    }

}
