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
  // Model of recent button submit
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

  }
  parseResponse(response: Object) {
    //Parse the new HTTP response from the stream into the local variables
    this.optimalAllocs = response["optimal_allocations"];
    this.sharpeRatio = response["sharpe_ratio"];
    this.tableRows = [['Stock','Starting Value','Ending Value','Sharpe Ratio']];
    for (var key of Object.keys(this.optimalAllocs)) {
      var row = [];
      row.push(key);
      row.push( (this.optimalAllocs[key] * this.query["initialInvestment"]).toString() );
      row.push("End Value");
      row.push("");
      this.tableRows.push(row);
    }
    var lastRow = [];
    lastRow.push("Total");
    lastRow.push(this.query["initialInvestment"].toString());
    lastRow.push("end value");
    lastRow.push(this.sharpeRatio.toString());
    this.tableRows.push(lastRow);
    console.log(this.tableRows);
  }

  onSubmit(value: Object) {
    // Triggered by the submition of the button in the input component
    this.query = value;
    this.optimizerDataService.subjectChange(value)
  }

  subscribeToResponse() {
    // Subscribe to the stream that will have HTTP Post responses
    this.optimizerDataService.responseSubject.subscribe(
      (x) => {
        //next value
        console.log(JSON.stringify(x));
        this.parseResponse(x);
      },
      (err) => {
        console.log('Response stream error: ' + err);
      },
      () => {
        console.log('Response stream completed')
      });
  }

 ngOnInit() {
 	this.tableRows = [['Stock','Starting Value','Ending Value','Sharpe Ratio'],['GOOG','549','600',''],['FB','451','490',''],['AAPL','0','0',''],['Total','1000','1090','2.5']];
  this.optimizerDataService.createSubject(this.query);
  this.subscribeToResponse();
 }
}
