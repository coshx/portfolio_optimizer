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
export class OptimizerComponent implements OnInit {
  data;

  constructor(private optimizerDataService: OptimizerDataService) {}

  ngOnInit() {
    this.getOptimizationData();
  }

  getOptimizationData() {
    this.data = this.optimizerDataService.getOptimizedPortfolio('http://stocks.coshx.com/backend', this.data);
  }
}
