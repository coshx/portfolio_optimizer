import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class TopbarStatusService {

  private statusSource = new BehaviorSubject<Object>({});
  status$ = this.statusSource.asObservable();

  constructor() { }

  setStatus(status: Object) {
    this.statusSource.next(status);
  }

}
