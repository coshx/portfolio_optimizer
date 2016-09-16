import {Component, Input} from '@angular/core';

@Component({
  selector: 'chart-manager'
})
export class ChartManagerComponent {
  constructor() {}

  @Input() optimalAllocs: Array<any>;
  @Input() title: string;

}
