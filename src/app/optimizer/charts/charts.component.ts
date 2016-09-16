import {Component, Input} from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'charts',
  templateUrl: 'charts.component.html',
  styleUrls: ['charts.component.css']
})
export class ChartsComponent {
  constructor() {}

  @Input() optimalAllocs: Array<any>;
  @Input() title: string;
  @Input() performance: Object;
}
