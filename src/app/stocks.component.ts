import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { OptimizerComponent } from './optimizer/optimizer.component';


@Component({
  moduleId: module.id,
  selector: 'stocks-app',
  templateUrl: 'stocks.component.html',
  styleUrls: ['stocks.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
/*@Routes([
  {path: '/optimizer', component: OptimizerComponent}
])*/
export class StocksAppComponent implements OnInit {
  constructor() {}
  siteName = 'Coshx Finance Tools';

  ngOnInit() {
    //this.router.navigate(['/optimizer']);
  }
}
