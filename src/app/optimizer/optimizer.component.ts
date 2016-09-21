import {Component, OnInit} from '@angular/core';

import {OptimizerDataService} from './optimizer-data.service';

@Component({
  selector: 'optimizer',
  templateUrl: 'optimizer.component.html',
  styleUrls: ['optimizer.component.css'],
  providers: [OptimizerDataService]
})
export class OptimizerComponent implements OnInit {
  static trailingDecimals: number = 4;

  initialInvestment: number;
  cumulativeReturns: number;
  optimalAllocs: Array<Object>;
  performance: Object;
  sharpeRatio: number;

  query: Object;
  loading: number;

  constructor(private optimizerDataService: OptimizerDataService) {
    this.loading = 0;
  }

  ngOnInit() {
    this.subscribeToResponse();
  }

  parseResponse(response: Object) {
    console.log("parseResponse called");
    console.log(response);

    this.initialInvestment = response['initial_investment'];
    this.cumulativeReturns = response['cumulative_returns'];
    this.optimalAllocs = [];
    for (let key in response['optimal_allocations']) {
      if (response['optimal_allocations'].hasOwnProperty(key)) {
        let pair = {};
        let value = response['optimal_allocations'][key];
        pair[key] = value;
        this.optimalAllocs.push(pair);
      }
    }
    this.performance = response['performance'];
    this.sharpeRatio = response['sharpe_ratio'];
  }

  submitData(value: Object) {
    console.log("submitData called");
    // Triggered by the submition of the button in the input component
    this.query = value;
    this.optimizerDataService.formDataSubject.next(value);
    this.loading++;
  }

  subscribeToResponse() {
    console.log("subscribeToResponse called");
    // Subscribe to the stream that will have HTTP Post responses
    this.optimizerDataService.responseSubject.subscribe(
      (response) => {
        // next value
        this.parseResponse(response);
        this.loading--;
      },
      (err) => {
        console.log('Response stream error: ' + err);
        this.loading--;
        // We got an error, so this subject will be terminated
        // But we still want to get successful HTTP responses, so let's make a new subject and subscribe to it
        this.optimizerDataService.resetResponseSubject();
        this.subscribeToResponse();
      },
      () => {
        console.log('Response stream completed');
      });
  }
}
