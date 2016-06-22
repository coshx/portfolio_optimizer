import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Subject, Observable, BehaviorSubject} from 'rxjs/Rx';

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

  responseSubject: BehaviorSubject<Object> = new BehaviorSubject("default");
  latestResponse;

  subject: BehaviorSubject<Object>;
  subscription;

  constructor(private http: Http) {

  }

  createSubject(model: Object) {
    this.subject = new BehaviorSubject(model);
    this.subscription = this.subject.subscribe(
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

    this.responseSubject.subscribe(
      (x) => {
        //next value
        console.log(x);
        this.latestResponse = x;
      },
      (err) => {
        console.log('Response stream error: ' + err);
      },
      () => {
        console.log('Response stream completed')
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

  private optimizedPortfolio = new Subject<Object>();
  optimizedPortfolio$ = this.optimizedPortfolio.asObservable();


}
