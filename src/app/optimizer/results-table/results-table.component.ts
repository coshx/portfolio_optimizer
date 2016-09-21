import {Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'results-table',
  templateUrl: 'results-table.component.html'
})

export class ResultsTableComponent implements OnChanges {
  constructor() {}

  @Input() optimalAllocs;
  @Input() initialInvestment;

  tableRows: Array<Array<string>>;

  ngOnChanges() {
    // TODO: Gracefully handle not having any data
    let stocks: Array<string> = Object.keys(this.optimalAllocs).sort();
    let naive: Array<string> = [];
    for (let _ of stocks) {
      naive.push((100 / stocks.length).toString());
    }
    let optimal: Array<string> = [];
    for (let stock of stocks) {
      optimal.push((this.optimalAllocs[stock] * 100).toFixed(2).toString());
    }
    this.tableRows = [['Stock', 'Naive', 'Optimal']];
    for (let r = 0; r < stocks.length; r++) {
      let row: Array<string> = [];
      for (let c = 0; c < this.tableRows.length; c++) {
        row.push(stocks[c]);
        row.push(naive[c]);
        row.push(optimal[c]);
      }
      this.tableRows.push(row);
    }
    console.log(this.tableRows);
  }
}
