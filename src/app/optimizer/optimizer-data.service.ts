import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class OptimizerDataService {
  // TODO: Add these once backend can
  // initialInvestment: Number;
  // endValue: Number;
  startDate: string;
  endDate: string;
  optimalAllocs: Object = {};
  sharpeRatio: Number;
  response;

  constructor(private http: Http) {}

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
