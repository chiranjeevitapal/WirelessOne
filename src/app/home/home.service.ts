import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Globals} from '../globals';

@Injectable()
export class HomeService {
    //urls
    private labsUrl = '/api/labs';
    private saveUrl = '/api/addlab';
    private host = '';

    constructor(private http: Http) {
        this.host = 'http://' + window.location.hostname + ':' + Globals.NODE_PORT;
    }

    fetchLabsList(): Observable<any> {
        return this.http.get(this.host + this.labsUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addLab(obj: Object): Observable<any> {
        let bodyString = JSON.stringify({ obj }); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.host + this.saveUrl, bodyString, options) // ...using post request
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
