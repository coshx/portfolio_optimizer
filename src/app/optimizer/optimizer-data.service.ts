import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Subject} from 'rxjs/Rx';
import {environment} from '../';

import {TopbarStatusService} from '../topbar-status.service'

@Injectable()
export class OptimizerDataService {

  private responseSource = new Subject<Object>();
  response$ = this.responseSource.asObservable();

  formDataSubject: Subject<Object> = new Subject();

  resetResponseSource() {
    //kinda hacky
    this.responseSource = new Subject<Object>();
  }

  constructor(private http: Http,
              private topbarStatusService: TopbarStatusService) {
    this.formDataSubject.subscribe(
      (query) => { this.optimizePortfolio(query); },
      (err) => { console.log('Form data stream error: ' + err); },
      () => { console.log('Form data stream completed'); });
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
          this.topbarStatusService.setStatus(response['period']);
        },
        err => this.responseSource.error(err)
      );
  }
}
