import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class OptimizerDataService {
  // TODO: Add these once backend can
  // initialInvestment: Number;
  // endValue: Number;
  symbols: string;
  startDate: string;
  endDate: string;
  initialInvestment: string;
  optimalAllocs: Object = {};
  sharpeRatio: string;
  response;

  constructor(private http: Http) {
    this.symbols = 'AAPL, GOOG, FB';
    this.startDate = '01/01/2012';
    this.endDate = '03/20/2016';
    this.initialInvestment = '1000';
    this.optimalAllocs = {'AAPL': 0.0,
                          'GOOG': 0.55,
                          'FB': 0.45};
    this.sharpeRatio = '2.1';
  }

  getOptimizedPortfolio(url: string, formValue: Object) {
    return this.http.post(url, JSON.stringify(formValue))
      .subscribe(
        data => this.response = data.json(),
        err => console.log(err)
      );
  }

  private optimizedPortfolio = new Subject<Object>();
  optimizedPortfolio$ = this.optimizedPortfolio.asObservable();

  // setOptimizedPortfolio(optimizedPortfolio: Object) {
  //   this.optimizedPortfolio = optimizedPortfolio;
  // }

  // getOptimizedPortfolio() {
  //   console.log('optimizedPortfolio equals', this.optimizedPortfolio);
  //   return this.optimizedPortfolio;
  // }

}
