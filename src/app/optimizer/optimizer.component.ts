import { Component, OnInit } from '@angular/core';

import {InputComponent} from './input/input.component';
import {BarchartComponent} from './barchart/barchart.component';
import {ResultsTableComponent} from './results-table/results-table.component';

@Component({
  moduleId: module.id,
  selector: 'optimizer',
  templateUrl: 'optimizer.component.html',
  styleUrls: ['optimizer.component.css'],
  directives: [InputComponent, BarchartComponent, ResultsTableComponent]
})
export class OptimizerComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }
}
