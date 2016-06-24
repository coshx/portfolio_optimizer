import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Subject, Observable, BehaviorSubject} from 'rxjs/Rx';

@Injectable()
export class OptimizerDataService {
  // TODO: Add these once backend can
  // initialInvestment: Number;
  // endValue: Number;

  responseSubject: BehaviorSubject<Object> = new BehaviorSubject(
    {"cumulative_returns":1.6650534305121512,
     "optimal_allocations":{"FB":0.4510450475179859,"GOOG":0.5489549524820141,"AAPL":0},
     "sharpe_ratio":0.5730332517669126});

  formDataSubject: BehaviorSubject<Object>;

  constructor(private http: Http) {

  }

  createFormDataSubject(model: Object) {
    this.formDataSubject = new BehaviorSubject(model);
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
