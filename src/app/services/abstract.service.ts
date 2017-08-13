import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

import { AbstractData } from '../models/abstract';

import {HttpResponse} from "selenium-webdriver/http";

@Injectable()
export class AbstractService<DataType extends AbstractData> {

    // protected urlPrefix = location.protocol + '//' + location.hostname + '/';
    protected apiUrl: string;
    protected headers = new Headers({Authorization: window['localStorage'].getItem('token')});

    constructor(protected http: Http) {}


    get(): Promise<DataType[] | string> {
        return this.http
        .get(this.apiUrl + '?api_token=ssss', {headers: this.headers})
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }


    post(item: DataType): Promise<DataType | string> {
        return this.http
        .post(this.apiUrl + '?api_token=ssss', item, {headers: this.headers})
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }


    put(item: DataType): Promise<DataType | string> {
        return this.http
        .put(this.apiUrl + '/' + item.id + '?api_token=ssss', item, {headers: this.headers})
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }


    delete(item: DataType): Promise<HttpResponse | string> {
        return this.http
        .delete(this.apiUrl + '/' + item.id + '?api_token=ssss', {headers: this.headers})
        .toPromise()
        .catch(this.handleError);
    }


    protected handleError(error: HttpResponse): Promise<string> {
        console.error('An error occurred', error);  // TODO alert message
        return Promise.reject(error.toString());    // TODO return error object
    }
}
