import { Component } from '@angular/core';

import { OptimizerComponent } from './optimizer/optimizer.component';


@Component({
  selector: 'stocks-app',
  templateUrl: 'stocks.component.html',
  styleUrls: ['stocks.component.css']
})

export class StocksAppComponent {
  constructor() {}
  siteName = 'Coshx Finance Tools';
}
