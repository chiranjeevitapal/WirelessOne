import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Globals} from '../globals';

@Injectable()
export class BenchService {
    //urls
    private benchesUrl = '/api/benches';
    private labDetailsUrl = '/api/lab';
    private addBenchUrl = '/api/addbench';
    private benchDetailsUrl = '/api/bench';
    private updateBenchUrl = '/api/updatebench';
    private deleteBenchUrl = '/api/deletebench';
    private host = '';

    constructor(private http: Http) {
        this.host = 'http://' + window.location.hostname + ':' + Globals.NODE_PORT;
    }

    fetchBenchesInLab(labid): Observable<any> {
        return this.http.get(this.host + this.benchesUrl + '/' + labid)
            .map(this.extractData)
            .catch(this.handleError);
    }
    fetchLabDetails(id: string): Observable<any> {
        return this.http.get(this.host + this.labDetailsUrl + '/' + id)
            .map(this.extractData)
            .catch(this.handleError);
    }
    addBench(obj: Object): Observable<any> {
        let bodyString = JSON.stringify({ obj }); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.host + this.addBenchUrl, bodyString, options) // ...using post request
            .map(this.extractData)
            .catch(this.handleError);
    }
    fetchBenchDetails(id: string): Observable<any> {
        return this.http.get(this.host + this.benchDetailsUrl + '/' + id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateBench(obj: Object): Observable<any> {
        let bodyString = JSON.stringify({ obj }); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.put(this.host + this.updateBenchUrl, bodyString, options) // ...using post request
            .map(this.extractData)
            .catch(this.handleError);
    }

    removeBench(id: string): Observable<any> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(this.host + this.deleteBenchUrl+'/'+id, options) // ...using post request
            .map(this.extractData)
            .catch(this.handleError);
    }


    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }


    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'error');
    }
}
