import { Component, OnInit } from '@angular/core';

import {InputComponent} from './input/input.component';
import {BarchartComponent} from './input/barchart/barchart.component';
import {ResultsTableComponent} from './input/results-table/results-table.component';

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
