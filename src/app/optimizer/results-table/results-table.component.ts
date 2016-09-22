import {Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'results-table',
  templateUrl: 'results-table.component.html'
})

export class ResultsTableComponent implements OnChanges {
  constructor() {}

  trailingDecimals = 0;
  @Input() optimalAllocs;
  @Input() initialInvestment;

  tableRows: Array<Array<string>>;

  ngOnChanges() {
    this.updateTable();
  }

  updateTable() {
    let stocks = this.optimalAllocs['stocks'];
    let optimal = this.optimalAllocs['allocations'];
    optimal = optimal.map((opt) => (opt * 100).toFixed(this.trailingDecimals).toString() + '%');
    let naive: Array<string> = [];
    for (let _ of stocks) {
      let allocation = (100 / stocks.length).toFixed(this.trailingDecimals);
      naive.push(allocation.toString() + '%');
    }

    this.tableRows = [['Stock', 'Naive', 'Optimal']];
    for (let i = 0; i < stocks.length; i++) {
      let row = [stocks[i], naive[i], optimal[i]];
      this.tableRows[i + 1] = row;
    }
  }
}
