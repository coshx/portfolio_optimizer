import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'charts',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'charts.component.html',
  styleUrls: ['charts.component.css']
})
export class ChartsComponent {
  constructor() {}

  @Input() optimalAllocs: Array<any>;
  @Input() cumulativeReturns: number;
  @Input() performance: Array<any>;

}
