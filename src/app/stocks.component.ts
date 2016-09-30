import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { OptimizerDataService } from './optimizer/optimizer-data.service';

@Component({
  selector: 'stocks-app',
  templateUrl: 'stocks.component.html',
  styleUrls: ['stocks.component.css'],
  providers: [OptimizerDataService]
})

export class StocksAppComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  constructor(private optimizerDataService: OptimizerDataService) {}

  navbarStatus = '';

  ngOnInit() {
    this.subscription = this.subscribeToResponse();
  }

  subscribeToResponse(): Subscription {
    return this.optimizerDataService.status$.subscribe(
      (response) => {
        console.log('receiving response in stocks.component');
        console.log('response', response);
        let startDate = response['start'];
        let endDate = response['end'];
        this.navbarStatus = 'Displaying data from ' + startDate + ' to ' + endDate;
      },
      (err) => {
        console.log('Response stream error: ' + err);
        // We got an error, so this subject will be terminated
        // But we still want to get successful HTTP responses, so let's make a new subject and subscribe to it
        this.optimizerDataService.resetResponseSource();
        this.subscribeToResponse();
      },
      () => {
        console.log('Response stream completed');
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
