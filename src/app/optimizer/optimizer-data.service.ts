import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Subject, Observable} from 'rxjs/Rx';

@Injectable()
export class OptimizerDataService {
  // TODO: Add these once backend can
  // initialInvestment: Number;
  // endValue: Number;

  // Observable sources
  private optimalAllocsSource = new Subject<Object>();
  private sharpeRatioSource = new Subject<number>();

  // Observable streams
  optimalAllocs$ = this.optimalAllocsSource.asObservable();
  sharpeRatio$ = this.sharpeRatioSource.asObservable();

  // Message alerts
  announceOptimalAllocs(optimalAllocs: Object) {
    this.optimalAllocsSource.next(optimalAllocs);
  }

  announceSharpeRatio(sharpeRatio: number) {
    this.sharpeRatioSource.next(sharpeRatio);
  }

  response;

  constructor(private http: Http) {

  }

  optimizePortfolio(formData: Object) {
    let url = 'http://stocks.coshx.com/backend';
    console.log('form data:', formData);
    return this.http.post(url, JSON.stringify(formData))
      .subscribe(
        data => this.response = data.json(),
        err => console.log(err)
      );
  }

  private optimizedPortfolio = new Subject<Object>();
  optimizedPortfolio$ = this.optimizedPortfolio.asObservable();

}
