import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

import { AbstractService } from './abstract.service';
import {Testimonial, ApiTestimonial} from '../models/testimonial';

@Injectable()
export class TestimonialService extends AbstractService<Testimonial> {

    protected apiUrl = 'http://localhost/api/admin/testimonials';

    constructor(protected http: Http) {
        super(http);
    }


    get(): Promise<Testimonial[]> {
        return this.http
        .get(this.apiUrl + '?api_token=ssss', {headers: this.headers})
        .toPromise()
        .then(response => {
            const list: Testimonial[] = [];
            response.json().forEach(item => {
                list.push(new Testimonial(item));
            });
            return list;
        })
        .catch(this.handleError);
    }


    post(item: Testimonial): Promise<Testimonial> {
        const apiTestimonial = new ApiTestimonial(item, true);
        return this.http
        .post(this.apiUrl + '?api_token=ssss', apiTestimonial, {headers: this.headers})
        .toPromise()
        .then(response => new Testimonial(response.json()))
        .catch(this.handleError);
    }


    put(item: Testimonial): Promise<Testimonial> {
        const apiTestimonial = new ApiTestimonial(item, true);
        return this.http
        .put(this.apiUrl + '/' + item.id + '?api_token=ssss', apiTestimonial, {headers: this.headers})
        .toPromise()
        .then(response => new Testimonial(response.json()))
        .catch(this.handleError);
    }
}
