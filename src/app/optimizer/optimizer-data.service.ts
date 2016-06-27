import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Subject} from 'rxjs/Rx';

@Injectable()
export class OptimizerDataService {
  // TODO: Add these once backend can
  // initialInvestment: Number;
  // endValue: Number;

  responseSubject: Subject<Object> = new Subject();

  formDataSubject: Subject<Object> = new Subject();

  constructor(private http: Http) {

  }

  prepareFormDataSubject(model: Object) {
    this.formDataSubject.subscribe(
      (query) => {
        //next value
        this.optimizePortfolio(query);
      },
      (err) => {
        console.log('Optimizer Component model error: ' + err);
      },
      () => {
        console.log('Optimizer Component model stream completed');
      });
    this.formDataSubject.next(model);
  }

  formDataSubjectChange(model: Object) {
    this.formDataSubject.next(model);
  }

  optimizePortfolio(formData: Object) {
    let url = 'http://stocks.coshx.com/backend';
    return this.http.post(url, JSON.stringify(formData))
      .subscribe(
        data => this.responseSubject.next(data.json()),
        err => console.log(err)
      );
  }
}
