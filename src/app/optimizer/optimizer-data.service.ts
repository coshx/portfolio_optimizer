import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BehaviorSubject, Subject} from 'rxjs/Rx';
import {environment} from '../';

@Injectable()
export class OptimizerDataService {

  private statusSource = new BehaviorSubject<Object>({});
  private responseSource = new Subject<Object>();

  formDataSubject: Subject<Object> = new Subject();
  status$ = this.statusSource.asObservable();
  response$ = this.responseSource.asObservable();

  resetResponseSource() {
    //kinda hacky
    this.responseSource = new Subject<Object>();
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
          this.statusSource.next(response['period']);
        },
        err => this.responseSource.error(err)
      );
  }
}
