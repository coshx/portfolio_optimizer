import {Component, OnInit} from '@angular/core';

import {OptimizerDataService} from './optimizer-data.service';
import {InputComponent} from './input/input.component';
import {ChartsComponent} from './charts/charts.component';
import {ResultsTableComponent} from './results-table/results-table.component';

@Component({
  selector: 'optimizer',
  templateUrl: 'optimizer.component.html',
  styleUrls: ['optimizer.component.css'],
  providers: [OptimizerDataService]
  //entryComponents: [InputComponent, ChartsComponent, ResultsTableComponent]
})
export class OptimizerComponent implements OnInit {
  optimalAllocs: Array<Object>;
  sharpeRatio: number;
  trailingDecimals: number = 4;

  // Model of recent button submit
  query: Object = {endDate: '03/20/2016',
                   initialInvestment: '1000',
                   startDate: '01/01/2012',
                   symbols: ['FB', 'GOOG', 'AAPL']};
  loading: number;
  tableRows: Array<Array<string>>;  // data table is 2D array

  constructor(private optimizerDataService: OptimizerDataService) {
    this.loading = 0;
  }

  ngOnInit() {
    let seedResponse = {'cumulative_returns': 1.66505,
                        'optimal_allocations': {'FB': 0.45104,
                                                'GOOG': 0.54895,
                                                'AAPL': 0},
                        'sharpe_ratio':0.57303}
    // Seed optimalAllocs and tableRows, so that the chart and table have values
    //  without having to wait for a HTTP Post response
    this.parseResponse(seedResponse);
    this.subscribeToResponse();
  }

  parseResponse(response: Object) {
    // Parse the new HTTP response from the stream into the local variables
    let keys: Array<string> = Object.keys(response['optimal_allocations']).sort();

    // Format optimalAllocs
    this.optimalAllocs = [];
    let obj: Object;
    for (let key of keys) {
      obj = {};
      obj['name'] = key;
      obj['value'] = response['optimal_allocations'][key];
      this.optimalAllocs.push(obj);
    }

    // Format tableRows
    this.sharpeRatio = response['sharpe_ratio'];
    this.tableRows = [['Stock','Starting Value','Ending Value','Sharpe Ratio']];
    let row: Array<string>;
    for (let key of keys) {
      row = [];
      row.push(key);
      row.push( (this.query['initialInvestment'] / keys.length).toFixed(this.trailingDecimals).toString() );
      row.push((response['optimal_allocations'][key] * this.query['initialInvestment']).toFixed(this.trailingDecimals).toString());
      row.push('');
      this.tableRows.push(row);
    }
    let lastRow: Array<string> = [];
    lastRow.push('Total');
    lastRow.push(this.query['initialInvestment'].toString());
    lastRow.push(this.query['initialInvestment'].toString());
    lastRow.push(this.sharpeRatio.toFixed(this.trailingDecimals).toString());
    this.tableRows.push(lastRow);
  }

  submitData(value: Object) {
    // Triggered by the submition of the button in the input component
    this.query = value;
    this.optimizerDataService.formDataSubject.next(value);
    this.loading++;
  }

  subscribeToResponse() {
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
