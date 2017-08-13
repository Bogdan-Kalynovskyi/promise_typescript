import { AbstractData } from './abstract';


function append(dst, src, exceptKeys?: Array<string>) {
    for (let key in src) {
        if (src.hasOwnProperty(key) && (!exceptKeys || exceptKeys.indexOf(key) === -1)) {
            dst[key] = src[key];
        }
    }
}


export class ApiTestimonial extends AbstractData {
    title: string;
    content: string;
    img: null | string;
    author: string;
    author_position: string;
    appendedto: {
        home?: number,
        showcase?: number
    };

    constructor (testimonial?: Testimonial, removeForPostPut?: boolean) {
        super();

        if (testimonial) {
            this.appendedto = {};
            if (testimonial.home) {
                this.appendedto.home = 1;
            }
            if (testimonial.showcase) {
                this.appendedto.showcase = 1;
            }

            const exceptKeys = ['home', 'showcase'];
            if (removeForPostPut) {
                exceptKeys.push('id', 'created_at', 'updated_at', 'order', 'created_by');  // todo showcase needs order
            }

            append(this, testimonial, exceptKeys);
        }
    }
}


export class Testimonial extends ApiTestimonial {
    home: boolean;
    showcase: boolean;

    constructor (testimonial?: ApiTestimonial) {
        super(); // should do nothing

        if (testimonial) {
            this.home = 'home' in testimonial.appendedto;
            this.showcase = 'showcase' in testimonial.appendedto;
            append(this, testimonial, ['appendedto']);
        }
    }
}
