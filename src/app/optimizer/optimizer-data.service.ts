import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BehaviorSubject, Subject} from 'rxjs/Rx';
import {environment} from '../';

@Injectable()
export class OptimizerDataService {

  private responseSource = new BehaviorSubject<Object>(0);
  response$ = this.responseSource.asObservable();
  formDataSubject: Subject<Object> = new Subject();

  resetResponseSource() {
    //kinda hacky
    this.responseSource = new BehaviorSubject<Object>(0);
  }

  constructor(private http: Http) {
    this.formDataSubject.subscribe(
      (query) => {
        //next value
        this.optimizePortfolio(query);
      },
      (err) => {
        console.log('Form data stream error: ' + err);
      },
      () => {
        console.log('Form data stream completed');
      });
  }

  optimizePortfolio(formData: Object) {
    let url;
    if (environment.production) {
      url = 'http://stocks.coshx.com/backend';
    } else {
      url = 'http://localhost:8000/backend';
    }

    return this.http.post(url, JSON.stringify(formData))
      .subscribe(
        data => {
          let response = data.json();
          this.responseSource.next(response);
        },
        err => this.responseSource.error(err)
      );
  }
}
