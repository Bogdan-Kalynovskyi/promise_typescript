import {Component, OnInit} from '@angular/core';

import {TestimonialService} from '../services/testimonials.service';
import {Testimonial} from '../models/testimonial';


@Component({
    selector: 'app-testimonials',
    templateUrl: './testimonials.component.html',
    providers: [TestimonialService]
})
export class TestimonialsComponent implements OnInit {
    testimonials: Testimonial[];

    constructor(
        private testimonialsService: TestimonialService
    ) { }


    ngOnInit() {
        this.testimonialsService.get().then(items => this.testimonials = items);
    }


    add() {
        this.testimonialsService.post(new Testimonial()).then(item => {
            this.testimonials.unshift(item);
        });
    }


    save(item: Testimonial) {
        this.testimonialsService.put(item).then(item => {
            const i = this.testimonials.indexOf(item);
            this.testimonials[i] = item;
        });
    }


    delete(item: Testimonial) {
        if (window['confirm']('Delete this?')) {
            this.testimonialsService.delete(item).then(() => {
                this.testimonials = this.testimonials.filter(h => h !== item);
            });
        }
    }
}
