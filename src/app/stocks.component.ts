import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TopbarStatusService } from './topbar-status.service';

import * as d3 from 'd3';

@Component({
  selector: 'stocks-app',
  templateUrl: 'stocks.component.html',
  styleUrls: ['stocks.component.scss'],
  providers: [TopbarStatusService]
})

export class StocksAppComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  navbarStatus: string;

  constructor(private topbarStatusService: TopbarStatusService) {}

  ngOnInit() {
    this.subscription = this.subscribeToStatus();
  }

  subscribeToStatus(): Subscription {
    return this.topbarStatusService.status$.subscribe(
      (status) => {
        if (Object.getOwnPropertyNames(status).length > 0) {
          let startDate = this.formatDate(status['start']);
          let endDate = this.formatDate(status['end']);
          this.navbarStatus = 'Displaying data from ' + startDate + ' to ' + endDate;
        }
      },
      (err) => { console.log('Response stream error: ' + err); },
      () => { console.log('Response stream completed'); });
  }

  formatDate(date: string) {
    let dateFormat = d3.time.format('%b %d %Y');
    return dateFormat(new Date(date));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
