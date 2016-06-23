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

  subject: BehaviorSubject<Object>;

  constructor(private http: Http) {

  }

  createSubject(model: Object) {
    this.subject = new BehaviorSubject(model);
    this.subject.subscribe(
      (x) => {
        //next value
        this.optimizePortfolio(x);
      },
      (err) => {
        console.log('Optimizer Component model error: ' + err);
      },
      () => {
        console.log('Optimizer Component model stream completed');
      });
  }

  subjectChange(model: Object) {
    this.subject.next(model);
  }

  optimizePortfolio(formData: Object) {
    let url = 'http://stocks.coshx.com/backend';
    //console.log('form data:', formData);
    return this.http.post(url, JSON.stringify(formData))
      .subscribe(
        data => this.responseSubject.next(data.json()),
        err => console.log(err)
      );
  }
}
