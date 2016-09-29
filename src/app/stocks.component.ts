import { Component, OnInit } from '@angular/core';
import { OptimizerDataService } from './optimizer/optimizer-data.service';

@Component({
  selector: 'stocks-app',
  templateUrl: 'stocks.component.html',
  styleUrls: ['stocks.component.css'],
  providers: [OptimizerDataService]
})

export class StocksAppComponent implements OnInit {
  constructor(private optimizerDataService: OptimizerDataService) {}

  navbarStatus = '';

  ngOnInit() {
    this.subscribeToResponse();
  }

  subscribeToResponse() {
    this.optimizerDataService.response$.subscribe(
      (response) => {
        // next value
        console.log('receiving response in stocks.component');
        let startDate = response['start_date'];
        let endDate = response['end_date'];
        this.navbarStatus = 'Displaying data from' + startDate + 'to' + endDate;
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

}
