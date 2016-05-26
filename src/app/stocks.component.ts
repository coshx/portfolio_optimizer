import { Component } from '@angular/core';

import { OptimizerComponent } from './optimizer/optimizer.component';

@Component({
  moduleId: module.id,
  selector: 'stocks-app',
  templateUrl: 'stocks.component.html',
  styleUrls: ['stocks.component.css'],
  directives: [OptimizerComponent]
})
export class StocksAppComponent {
  title = 'stocks works!';
}
