import {Component, OnInit} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';

import {OptimizerDataService} from './optimizer-data.service';
import {InputComponent} from './input/input.component';
import {BarchartComponent} from './barchart/barchart.component';
import {ResultsTableComponent} from './results-table/results-table.component';

@Component({
  moduleId: module.id,
  selector: 'optimizer',
  templateUrl: 'optimizer.component.html',
  styleUrls: ['optimizer.component.css'],
  directives: [InputComponent, BarchartComponent, ResultsTableComponent],
  providers: [OptimizerDataService, HTTP_PROVIDERS]
})
export class OptimizerComponent {
  optimalAllocs: Object;
  sharpeRatio: Number;
  query: Object = {endDate: "03/20/2016",
           initialInvestment: "1000",
           startDate: "01/01/2012",
           symbols: ["AAPL", "GOOG", "FB"]};

  //optimalAllocs = {AAPL: 0.0,
  //                 GOOG: 0.5489549524820141,
  //                 FB: 0.4510450475179859};
  //sharpeRatio = 0.5730332517669126;
  history: Object[] = [];
  data;
  tableRows;

  constructor(private optimizerDataService: OptimizerDataService) {
    optimizerDataService.optimalAllocs$.subscribe();
  }

  onSubmit(value: Object) {
    console.log(value);
    this.query = value;
  }

 ngOnInit() {
 	this.tableRows = [['Stock','Starting Value','Ending Value','Sharpe Ratio'],['GOOG','549','600',''],['FB','451','490',''],['AAPL','0','0',''],['Total','1000','1090','2.5']];
  //   this.optimizerDataService.optimizePortfolio();
 }

  // getOptimizationData() {
  //   this.data = this.optimizerDataService.optimizePortfolio(this.data);
  // }
}
